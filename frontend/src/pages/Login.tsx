import {
    Button, TextField, Card, CardContent, Typography,
    FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput
} from "@mui/material";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleLogin } from "../api/adminApi";
import { toast, Toaster } from 'react-hot-toast';
import { Visibility } from '@mui/icons-material';
import { VisibilityOff } from '@mui/icons-material';

const loginSchema = z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, "Invalid credentials, Please try again")
});

type LoginSchemaType = z.infer<typeof loginSchema>;

const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema)
    });
    const token = localStorage.getItem('token');

    if (token) return <Navigate to="/admin/dashboard" replace />;


    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const loginHandler = async (data: LoginSchemaType) => {
        const response = await handleLogin(data);

        if (response && response?.status >= 400) {
            toast.error(response?.data.message || 'An error occurred');
            return;
        }
        if (response?.data.token) {
            localStorage.setItem('token', response.data.token)
        }

        navigate('/admin/dashboard');
    };

    return (
        <div className="h-screen flex bg-gray-100 justify-center items-center">
            <Toaster />
            <Card className="w-full max-w-sm shadow-lg">
                <CardContent>
                    <Typography variant="h5" className="text-center font-semibold mb-6">
                        Admin Login
                    </Typography>
                    <form className="flex flex-col mt-5 gap-4" onSubmit={handleSubmit(loginHandler)}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            type="email"
                            {...register('email')}
                            fullWidth
                            required
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm">{errors.email.message}</p>
                        )}

                        <FormControl variant="outlined" fullWidth>
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={
                                                showPassword ? 'hide the password' : 'display the password'
                                            }
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            onMouseUp={handleMouseUpPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                {...register('password')}
                                label="Password"
                            />
                        </FormControl>
                        {errors.password && (
                            <p className="text-red-500 text-sm">{errors.password.message}</p>
                        )}

                        <Button variant="contained" type="submit" color="primary" className="mt-4" fullWidth>
                            Login
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
