import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, MenuItem,  Paper, Box } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
// import { MuiTelInput } from 'mui-tel-input'

import { z } from "zod";
import { submitSurvey } from "../api/surveyApi";
import toast, { Toaster } from "react-hot-toast";
import community_survey from '../assets/Community-Survey.jpg'
import { countries } from "../constants/countries";

const surveySchema = z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().trim().min(7, "Invalid phone number").max(15,"Invalid phone number"),
    nationality: z.string().trim().min(3, "Nationality must be valid"),
    gender: z.enum(["male", "female", "other"], { required_error: "Gender is required" }),
    address: z.string().trim().min(5, "Address must be at least 5 characters"),
    message: z.string().trim().min(10, "Message must be at least 10 characters"),
});

type SurveyFormData = z.infer<typeof surveySchema>;

const SurveyForm = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SurveyFormData>({
        resolver: zodResolver(surveySchema),
    });

    // useEffect(() => {
    //     if (successMessage || errorMessage) {
    //         const timer = setTimeout(() => {
    //             setSuccessMessage(null);
    //             setErrorMessage(null);
    //         }, 5000);
    //         return () => clearTimeout(timer);
    //     }
    // }, [successMessage, errorMessage]);

    const onSubmit = async (data: SurveyFormData) => {
        try {
            console.log(data, 'data dkfjdkjfdk');

            const response = await submitSurvey(data)
            if (response && response?.status >= 400) {
                toast.error(response.data.message || 'an error occured')
                return
            }
            toast.success("Survey submitted successfully!");
            reset();
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center  p-6">
            <Paper elevation={3} className="w-full max-w-2xl p-8 rounded-lg bg-white shadow-lg">
                <Toaster />
                <img src={community_survey} alt="survey_image" className="w-full" />
                <form className="flex flex-col gap-5 mt-5" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex gap-4">
                        <TextField label="Name" fullWidth {...register("name")} error={!!errors.name} helperText={errors.name?.message} />
                        <TextField label="Email" type="email" fullWidth {...register("email")} error={!!errors.email} helperText={errors.email?.message} />
                    </div>

                    <div className="flex gap-4">

                        {/* <TextField label="Nationality" fullWidth {...register("nationality")} error={!!errors.nationality} helperText={errors.nationality?.message} /> */}
                        <Autocomplete
                            id="country-select-demo"
                            fullWidth
                            // sx={{ width: 300 }}
                            options={countries}
                            autoHighlight
                            getOptionLabel={(option) => option.label}
                            renderOption={(props, option) => {
                                const { key, ...optionProps } = props;
                                return (
                                    <Box
                                        key={key}
                                        component="li"
                                        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                                        {...optionProps}
                                    >
                                        <img
                                            loading="lazy"
                                            width="20"
                                            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                            alt=""
                                        />
                                        {option.label} ({option.code}) +{option.phone}
                                    </Box>
                                );
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Nationality"
                                    slotProps={{
                                        htmlInput: {
                                            ...params.inputProps,
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                        },
                                    }}

                                    {...register("nationality")} error={!!errors.nationality} helperText={errors.nationality?.message}
                                />
                            )}
                        />
                        <TextField label="Phone Number" fullWidth {...register("phoneNumber")} error={!!errors.phoneNumber} helperText={errors.phoneNumber?.message} />
                    </div>

                    <TextField select label="Gender" fullWidth {...register("gender")} error={!!errors.gender} helperText={errors.gender?.message}>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                    </TextField>

                    <TextField label="Address" multiline rows={2} fullWidth {...register("address")} error={!!errors.address} helperText={errors.address?.message} />
                    <TextField label="Message" multiline rows={4} fullWidth {...register("message")} error={!!errors.message} helperText={errors.message?.message} />

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{
                            backgroundColor: "#007bff",
                            color: "white",
                            "&:hover": { backgroundColor: "#0056b3" },
                            fontSize: "1rem",
                            fontWeight: "bold",
                            padding: "12px"
                        }}
                    >
                        Submit
                    </Button>
                </form>
            </Paper>
        </div>

    );
};

export default SurveyForm;
