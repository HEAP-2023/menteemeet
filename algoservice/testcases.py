from Mentee import Mentee
from Mentor import Mentor
from GroupingGen import generateGroupings

### CREATE ALL MENTORS & MENTEE ###
mentor1 = Mentor("Mary Anne")
mentor2 = Mentor("James Tan")
mentor3 = Mentor("Jeremy Koh")

mentee1 = Mentee("Kimberly")
mentee2 = Mentee("Candy")
mentee3 = Mentee("Elijah")
mentee4 = Mentee("Teresa")
mentee5 = Mentee("Brendan")
mentee6 = Mentee("Angeline")
mentee7 = Mentee("Hongyao")
mentee8 = Mentee("Axel")
mentee9 = Mentee("Bruce")
mentee10 = Mentee("Kangmin")
mentee11 = Mentee("Ruey")
mentee12 = Mentee("Olivia")
mentee13 = Mentee("Abrams")


### TEST CASE 1 ###
mentee1.ranking = {61: [mentor1], 98: [mentor2], 10: [mentor3]} #a
mentee2.ranking = {85: [mentor1], 81: [mentor2], 10: [mentor3]} #a
mentee3.ranking = {75: [mentor1], 71: [mentor2], 10: [mentor3]} 
mentee4.ranking = {82: [mentor1], 91: [mentor2], 10: [mentor3]} #a
mentee5.ranking = {53: [mentor1], 62: [mentor2], 10: [mentor3]} 
mentee6.ranking = {61: [mentor1], 74: [mentor2], 10: [mentor3]} 
mentee7.ranking = {49: [mentor1], 65: [mentor2], 10: [mentor3]} 
mentee8.ranking = {52: [mentor1], 92: [mentor2], 10: [mentor3]} #a
mentee9.ranking = {52: [mentor1], 92: [mentor2], 10: [mentor3]} #a
mentee10.ranking = {41: [mentor1], 84: [mentor2], 10: [mentor3]} 
mentee11.ranking = {52: [mentor1], 72: [mentor2], 100: [mentor3]} #a
mentee12.ranking = {100: [mentor1], 92: [mentor2], 10: [mentor3]} #a
# mentee13.ranking = {100: [mentor1], 92: [mentor2], 10: [mentor3]} nj

EXPECTED = {
    mentor1: [mentee12, mentee2, mentee3, mentee6],
    mentor2: [mentee1, mentee8, mentee9, mentee4],
    mentor3: [mentee11, mentee5, mentee7, mentee10]
}
ACTUAL = generateGroupings([mentor1, mentor2, mentor3],
                          [mentee1, mentee2, mentee3,
                           mentee4, mentee5, mentee6,
                           mentee7, mentee8, mentee9,
                           mentee10, mentee11, mentee12],
                          TEST_MODE=True)

print("TEST CASE 1: ", end='')
print("OK!" if ACTUAL == EXPECTED else "FAIL")
# print("EXPECTED:", EXPECTED)
for mentor in ACTUAL:
    print(f"{mentor}: {len(mentor.group)}\n\t{[mentee.__str__() for mentee in mentor.group]}")
    print()
