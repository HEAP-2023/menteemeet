export const splitObjIntoArrSize = (size, object) => {
    let output = [];
    let i = 0;
    Object.entries(object).forEach(([key,value]) => {
        if(i % size === 0){
            output.push([]);
        }
        output[Math.floor(i / size)].push(value)
        i++; 
   })
   return output
}





const initial =  [
    {
        id : 1,
        groupNo : 1,
        mentor : [{id : 1, name : "Hong Yao"}, {id : 2, name : "Gabriel"}],
        mentee : [{id : 3, name : "Olivia"}, {id : 4, name : "Axel"}, {id : 5, name : "Bruce"}],
        commonDT : ["Mondays, 9pm to 10pm", "Saturdays, 2pm to 6pm"]
    }, 
    {
        id : 2,
        groupNo : 2,
        mentor : [{id : 6, name : "alpha"}, {id : 7, name : "beta"}],
        mentee : [{id : 8, name : "gamma"}, {id : 9, name : "delta"}, {id : 10, name : "epsilon"}],
        commonDT : ["Mondays, 9pm to 10pm", "Saturdays, 2pm to 6pm"]
    }
]

// changes
// move olivia and hong yao to group 2 and then move olivia back
// child id = int, container id = int

// get all child that has been changed out
const changes = [{id : 3, type : "mentee", to : 2}, {id : 3, type : "mentee", to : 1}, {id : 1, type : "mentor", to : 2}]


export const DnDchanges = (initial, changes) => {
    
    let resolvedChanges = new Map();
    // step 1 resolve conflicts within changes 1st
    changes.forEach(({id, type, to}) => {
        resolvedChanges.set(id + type, to)
    } )

    // step 2 take out those with changes
    
    const temp = {"mentee" : [], "mentor" : []};
    const final = [];
    initial.forEach(row => {
        for (let i = 0; i < row.mentor.length; i++) {
            if(resolvedChanges.has(row.mentor[i].id + "mentor")){
                const [item] = row.mentor.splice(i, 1);
                temp.mentor.push(item);
            }
            if(resolvedChanges.has(row.mentee[i].id + "mentee")){
                const [item] = row.mentee.splice(i, 1);
                temp.mentee.push(item);
            }
        }
        final.push(row)
    });

    // step 3 put those with changes to the correct place
    temp.mentee.forEach(mentee => {
        final.map(row => {
            if(row.id === resolvedChanges.get(mentee.id + "mentee")){
                row.mentee.push(mentee)
                temp.mentee.shift();
                return;
            }
        })
    });

    temp.mentor.forEach(mentor => {
        final.map(row => {
            if(row.id === resolvedChanges.get(mentor.id + "mentor")){
                row.mentor.push(mentor)
                temp.mentor.shift();
            }
            return;
        })
    });
    return final;
}
