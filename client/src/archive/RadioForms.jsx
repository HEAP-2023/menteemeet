 {/* <Box display="flex" width="100%" flexDirection="column">
                    <FormControl
                    error={errors["fixedDates"] !== undefined}
                    >
                        <Box display="flex">
                            <Typography fontWeight="bold" mb="10px">Session on fixed dates?</Typography>
                            <FormHelperText>{errors["fixedDates"]?.message}</FormHelperText>
                        </Box>
                        <Box width="100%">
                                <Controller
                                name="fixedDates"
                                control={control}
                                render={({field}) => 
                                <RadioGroup
                                row
                                {...field}>
                                <FormControlLabel value="Yes" control={<Radio color="secondary"/>} label="Yes" />
                                <FormControlLabel value="No" control={<Radio color="secondary"/>} label="No" />
                            </RadioGroup>
                            }
                                />
                        </Box>
                    </FormControl>
                </Box> */}

                {/* <Box display="flex" width="100%" flexDirection="column">
                <FormControl
                    error={errors["frequency"] !== undefined}
                >
                    <Box display="flex">
                        <Typography fontWeight="bold" mb="10px">Frequency of sessions</Typography>
                        <FormHelperText>{errors["frequency"]?.message}</FormHelperText>
                    </Box>
                        <Box width="100%" >
                            <Controller
                            name="frequency"
                            control={control}
                            render={({field}) => 
                            <RadioGroup
                            row
                            {...field}>
                                <FormControlLabel value="weekly" control={<Radio color="secondary"/>} label="Weekly" />
                                <FormControlLabel value="monthly" control={<Radio color="secondary"/>} label="Monthly" />
                                <FormControlLabel value="yearly" control={<Radio color="secondary"/>} label="Yearly" />
                                <FormControlLabel value="na" control={<Radio color="secondary"/>} label="Not Applicable" />

                        </RadioGroup>
                        }
                            />
                        </Box>
                </FormControl>
                </Box> */}
