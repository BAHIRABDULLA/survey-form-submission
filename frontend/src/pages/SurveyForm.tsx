import community_survey from '../assets/Community-Survey.jpg';
import Autocomplete from '@mui/material/Autocomplete';
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField, Button, MenuItem, Paper, Box } from "@mui/material";
import { z } from "zod";
import { submitSurvey } from "../api/surveyApi";
import { countries } from "../constants/countries";

const surveySchema = z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().trim().min(7, "Invalid phone number").max(15, "Invalid phone number"),
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

    const onSubmit = async (data: SurveyFormData) => {
        try {
            const response = await submitSurvey(data);
            if (response && response?.status >= 400) {
                toast.error(response.data.message || 'an error occurred');
                return;
            }
            toast.success("Survey submitted successfully!");
            reset();
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 ">
            <div className="w-full max-w-2xl">
                <Paper elevation={3} className="w-full rounded-lg bg-white shadow-lg overflow-hidden">
                    <Toaster />
                    <div className="relative w-full h-48 sm:h-64 md:h-64 overflow-hidden">
                        <img
                            src={community_survey}
                            alt="survey_image"
                            className="w-full h-full object-cover object-center"
                        />
                    </div>

                    <div className="p-4 sm:p-6 md:p-8">
                        <form className="flex flex-col gap-4 md:gap-5" onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <TextField
                                    label="Name"
                                    fullWidth
                                    {...register("name")}
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    className="w-full sm:w-1/2"
                                />
                                <TextField
                                    label="Email"
                                    type="email"
                                    fullWidth
                                    {...register("email")}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    className="w-full sm:w-1/2"
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Autocomplete
                                    id="country-select-demo"
                                    fullWidth
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
                                            className="w-full sm:w-1/2"
                                            slotProps={{
                                                htmlInput: {
                                                    ...params.inputProps,
                                                    autoComplete: 'new-password',
                                                },
                                            }}
                                            {...register("nationality")}
                                            error={!!errors.nationality}
                                            helperText={errors.nationality?.message}
                                        />
                                    )}
                                />
                                <TextField
                                    label="Phone Number"
                                    fullWidth
                                    {...register("phoneNumber")}
                                    error={!!errors.phoneNumber}
                                    helperText={errors.phoneNumber?.message}
                                    className="w-full sm:w-1/2"
                                />
                            </div>

                            <TextField
                                select
                                label="Gender"
                                fullWidth
                                {...register("gender")}
                                error={!!errors.gender}
                                helperText={errors.gender?.message}
                            >
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                            </TextField>

                            <TextField
                                label="Address"
                                multiline
                                rows={2}
                                fullWidth
                                {...register("address")}
                                error={!!errors.address}
                                helperText={errors.address?.message}
                            />

                            <TextField
                                label="Message"
                                multiline
                                rows={4}
                                fullWidth
                                {...register("message")}
                                error={!!errors.message}
                                helperText={errors.message?.message}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded transition-colors duration-200"
                                sx={{
                                    fontSize: "1rem",
                                    textTransform: "none"
                                }}
                            >
                                Submit
                            </Button>
                        </form>
                    </div>
                </Paper>
            </div>
        </div>
    );
};

export default SurveyForm;