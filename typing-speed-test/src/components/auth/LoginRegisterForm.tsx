import React, {useCallback, useRef, useState} from 'react';
import {
    Alert,
    Avatar,
    Box,
    Button,
    Checkbox,
    Container,
    CssBaseline,
    Dialog,
    FormControlLabel,
    Grid,
    Link,
    TextField,
    Typography
} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {supabase} from '../../utils/supabase';
import {FaFacebook, FaGoogle} from 'react-icons/fa';
import {Colors} from '../../assets/colors';
// import GoogleIconWithGradient from "../../assets/googleIconWithGradient"; //TODO: google gradient logo
import KeyboardIcon from "@mui/icons-material/Keyboard";
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import {v4 as uuidv4} from 'uuid';


//TODO: in the future add cropping to the avatar

interface LoginRegisterProps {
    open: boolean;
    onClose: () => void;
}

const theme = createTheme({
    palette: {
        primary: {
            main: Colors.first,
        },
        secondary: {
            main: Colors.Secondary,
        },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: Colors.first,
                    '&:hover': {
                        backgroundColor: Colors.first,
                    },
                },
            },
        },
        MuiInput: {
            styleOverrides: {
                underline: {
                    '&:after': {
                        borderBottomColor: Colors.first,
                    },
                },
            },
        },
        MuiFormControlLabel: {
            styleOverrides: {
                root: {
                    color: Colors.first,
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    '&.Mui-checked': {
                        color: Colors.first,
                    },
                },
            },
        },
    },
});

const googleButtonStyles = {
    mt: 1,
    mb: 1,
    bgcolor: 'white',
    color: 'black',
    '&:hover': {
        bgcolor: '#f5f5f5',
    },
};

const facebookButtonStyles = {
    mt: 1,
    bgcolor: '#3b5998',
    color: 'white',
    '&:hover': {
        bgcolor: '#3b5998d9',
    },
};

const validateEmail = (email: string) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
};

const validatePassword = (password: string) => {
    return password.length >= 8 && /\d/.test(password);
};

const validateUsername = (username: string) => {
    return username.length >= 4;
};

export const LoginRegisterForm: React.FC<LoginRegisterProps> = ({open, onClose}) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(true); // true for LoginRegisterForm, false for SignUp
    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [retypePasswordError, setRetypePasswordError] = useState('');
    const [alert, setAlert] = useState<{
        show: boolean;
        message: string;
        severity: 'error' | 'info' | 'success' | 'warning' | undefined
    }>({show: false, message: '', severity: undefined});
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState('');

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        const {data, error} = await supabase.auth.resetPasswordForEmail(resetEmail, {
            redirectTo: 'http://localhost:3000/update-password',
        });
        if (error) {
            setAlert({show: true, message: error.message, severity: 'error'});
        } else {
            setAlert({show: true, message: 'Check your email for the reset link.', severity: 'success'});
        }
    };


    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleClickAvatarInput = () => {
        fileInputRef.current?.click();
    };

    const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            const file = event.dataTransfer.files[0];
            setAvatarPreview(URL.createObjectURL(file));
        }
    }, []);

    const toggleForm = () => setIsSigningIn(!isSigningIn);

    const handleSignUp = async (email: string, password: string, username: string) => {
        try {
            const {data: emailData, error: emailError} = await supabase
                .from('auth')
                .select('email')
                .eq('email', email)
                .single();

            if (emailData) {
                setAlert({show: true, message: 'This email is already connected with an account.', severity: 'error'});
                return;
            }

            const {data: usernameData, error: usernameError} = await supabase
                .from('profiles')
                .select('username')
                .eq('username', username)
                .single();

            if (usernameData) {
                setAlert({
                    show: true,
                    message: 'This username is taken, please choose a different username.',
                    severity: 'error'
                });
                return;
            }

            const {data, error: signUpError} = await supabase.auth.signUp({email, password});
            if (signUpError) {
                console.error('Error signing up:', signUpError.message);
                setAlert({show: true, message: 'Oops, something went wrong during registration.', severity: 'error'});
                return;
            }
            const {user} = data;
            if (!user) {
                console.error('Sign up successful, but no user data returned');
                return;
            }

            const {error: profileError} = await supabase
                .from('profiles')
                .insert([{id: user.id, username: username, avatar_url: null}]);
            if (profileError) {
                console.error('Error creating profile:', profileError.message);
                setAlert({
                    show: true,
                    message: 'Oops, something went wrong during profile creation.',
                    severity: 'error'
                });
            } else {
                if (avatarPreview && fileInputRef.current && fileInputRef.current.files && fileInputRef.current.files.length > 0) {
                    const avatarFile = fileInputRef.current.files[0];
                    const fileExtension = avatarFile.name.split('.').pop();
                    const uniqueFileName = `public/${uuidv4()}.${fileExtension}`;

                    const {error: uploadError} = await supabase
                        .storage
                        .from('avatars')
                        .upload(uniqueFileName, avatarFile, {
                            cacheControl: '3600',
                            upsert: false
                        });

                    if (uploadError) {
                        console.error('Error uploading avatar:', uploadError.message);
                        // Optionally, you can set an alert to notify the user that the avatar upload failed
                    } else {
                        // Fix for TS2339: Correctly access the publicUrl property
                        const avatarUrlResponse = await supabase.storage.from('avatars').getPublicUrl(uniqueFileName);
                        if (avatarUrlResponse.data) {
                            const avatarUrl = avatarUrlResponse.data.publicUrl; // Correct property access
                            await supabase
                                .from('profiles')
                                .update({avatar_url: avatarUrl})
                                .eq('id', user.id);
                        }
                    } //TODO: nie dziala :(
                }
                onClose();
                setAlert({
                    show: true,
                    message: 'Registration successful! Please check your email to verify your account.',
                    severity: 'success'
                });
            }
        } catch (error) {
            console.error('Unhandled error during sign up:', error);
            setAlert({show: true, message: 'Oops, something went wrong during registration.', severity: 'error'});
        }
    };

    const handleSignIn = async (email: string, password: string) => {
        try {
            const {error} = await supabase.auth.signInWithPassword({email, password});
            if (error) {
                console.error('Error signing in:', error.message);
                if (error.message === 'Invalid login credentials') {
                    setAlert({show: true, message: 'Incorrect email or password.', severity: 'error'});
                } else {
                    setAlert({show: true, message: 'Oops, something went wrong during sign in.', severity: 'error'});
                }
            } else {
                // setAlert({ show: true, message: 'Login successful!', severity: 'success' });
                onClose();
            }
        } catch (error) {
            console.error('Unhandled error during sign in:', error);
            setAlert({show: true, message: 'Oops, something went wrong during sign in.', severity: 'error'});
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        let isValid = true;

        if (!validateEmail(email)) {
            setEmailError('Invalid email format');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (!isSigningIn) {
            if (!validateUsername(username)) {
                setUsernameError('Username must be at least 4 characters long');
                isValid = false;
            } else {
                setUsernameError('');
            }

            if (!validatePassword(password)) {
                setPasswordError('Password must be at least 8 characters long and contain a number');
                isValid = false;
            } else {
                setPasswordError('');
            }

            if (password !== retypePassword) {
                setRetypePasswordError('Passwords do not match');
                isValid = false;
            } else {
                setRetypePasswordError('');
            }
        } else {
            if (!validatePassword(password)) {
                setPasswordError('Invalid password');
                isValid = false;
            } else {
                setPasswordError('');
            }
        }

        if (!isValid) return;

        if (isSigningIn) {
            await handleSignIn(email, password);
        } else {
            await handleSignUp(email, password, username);
        }

        const {error} = await supabase.auth.signInWithPassword({email, password});
        if (error) {
            console.error('Error signing in:', error.message);
        } else {
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} sx={{backgroundColor: Colors.third}}>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    {alert.show && (
                        <Alert severity={alert.severity} onClose={() => setAlert({...alert, show: false})}>
                            {alert.message}
                        </Alert>
                    )}
                    <CssBaseline/>
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <KeyboardIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            {isSigningIn ? 'Sign in' : 'Sign Up'}
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                            {isSigningIn ? (
                                <>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        autoFocus
                                        value={email}
                                        error={!!emailError}
                                        helperText={emailError}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        value={password}
                                        error={!!passwordError}
                                        helperText={passwordError}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox value="remember" color="primary"/>}
                                        label="Remember me"
                                        sx={{color: Colors.Secondary}}
                                    />
                                </>
                            ) : (
                                <>
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        name="username"
                                        autoComplete="username"
                                        autoFocus
                                        value={username}
                                        error={!!usernameError}
                                        helperText={usernameError}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        value={email}
                                        error={!!emailError}
                                        helperText={emailError}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        value={password}
                                        error={!!passwordError}
                                        helperText={passwordError}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="retypePassword"
                                        label="Retype Password"
                                        type="password"
                                        id="retypePassword"
                                        autoComplete="new-password"
                                        value={retypePassword}
                                        error={!!retypePasswordError}
                                        helperText={retypePasswordError}
                                        onChange={(e) => setRetypePassword(e.target.value)}
                                    />
                                    <Box
                                        onDragOver={(event) => event.preventDefault()}
                                        onDrop={handleDrop}
                                        onClick={handleClickAvatarInput}
                                        sx={{
                                            width: 200, // Larger box
                                            height: 200,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            border: '1px dashed gray',
                                            borderRadius: '50%',
                                            overflow: 'hidden', // Ensures the preview is circular
                                            position: 'relative', // For positioning the avatar preview
                                            backgroundColor: '#f5f5f5',
                                            margin: 'auto'
                                        }}
                                    >
                                        {avatarPreview ? (
                                            <Avatar
                                                src={avatarPreview}
                                                sx={{width: 200, height: 200, position: 'absolute'}}
                                            />
                                        ) : (
                                            <PhotoCameraIcon sx={{fontSize: 60}}/>
                                        )}
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                mt: 1,
                                                position: 'absolute',
                                                bottom: 10,
                                                color: avatarPreview ? 'white' : 'inherit',
                                                WebkitTextStroke: avatarPreview ? '0.2px black' : 'none'
                                            }}
                                        >
                                            {avatarPreview ? 'Avatar Preview' : 'Upload Avatar'}
                                        </Typography>
                                    </Box>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleAvatarChange}
                                        style={{display: 'none'}}
                                        accept="image/*"
                                    />
                                </>
                            )}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                {isSigningIn ? 'Sign In' : 'Sign Up'}
                            </Button>
                            {isSigningIn ? (
                                <>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        sx={googleButtonStyles}
                                        startIcon={<FaGoogle/>}
                                        onClick={() => {
                                            //TODO: Google logging in
                                        }}
                                    >
                                        Sign in with Google
                                    </Button>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        sx={facebookButtonStyles}
                                        startIcon={<FaFacebook/>}
                                        onClick={() => {
                                            //TODO: FB logging in
                                        }}
                                    >
                                        Sign in with Facebook
                                    </Button>
                                </>
                            ) : null}
                            <Grid container spacing={2} sx={{mt: 2}}>
                                <Grid item xs>
                                    <Link
                                        component="button"
                                        variant="body2"
                                        sx={{color: Colors.Secondary, cursor: 'pointer'}}
                                        onClick={(e) => {
                                            e.preventDefault(); // Prevent default link action
                                            setShowForgotPassword(!showForgotPassword); // Toggle the forgot password form visibility
                                        }}
                                    >
                                        {isSigningIn ? 'Forgot password?' : ''}
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2" sx={{color: Colors.Secondary}} onClick={toggleForm}>
                                        {isSigningIn ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                        {showForgotPassword ? (
                            <Box component="form" onSubmit={handleForgotPassword} noValidate sx={{mt: 1}}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="resetEmail"
                                    label="Email Address"
                                    type="email"
                                    id="resetEmail"
                                    autoComplete="email"
                                    value={resetEmail}
                                    onChange={(e) => setResetEmail(e.target.value)}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{mt: 3, mb: 2}}
                                >
                                    Send Reset Email
                                </Button>
                            </Box>
                        ) : null}
                    </Box>
                    <Typography variant="body2" color="text.secondary" align="center" sx={{mt: 8, mb: 4}}>
                        {'Copyright © '}
                        <Link color="inherit" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target={'_blank'}>
                            Speedy
                        </Link>{' '}
                        {new Date().getFullYear()}
                        {'.'}
                    </Typography>
                </Container>
            </ThemeProvider>
        </Dialog>
    );
};

export default LoginRegisterForm;
