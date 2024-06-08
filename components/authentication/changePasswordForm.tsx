// components/authentication/ChangePasswordForm.tsx
import React, { useState } from 'react';
import Button from '@/components/button';
import TextField from '@/components/textField';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { IconButton } from '@mui/material';
import useChangePasswordForm from './hooks/usePasswordChangeForm';

export default function ChangePasswordForm({ token }: { token: string }) {
    const { form, onValid, onInvalid } = useChangePasswordForm();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    return (
        <form className='my-4' onSubmit={form.handleSubmit(onValid, onInvalid)}>
            <legend className='text-xs text-right text-gray-700'>
                <span className='text-red-500 mr-1'>*</span>
                indicates required
            </legend>
            <div>
                <div className='mt-4'>
                    <TextField
                        control={form.control}
                        name='newPassword'
                        label={
                            <span>
                                New Password <span className='text-red-500 ml-1'>*</span>
                            </span>
                        }
                        type={isPasswordVisible ? 'text' : 'New Password'}
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                                    {isPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            ),
                        }}
                    />
                </div>
                <div className='mt-4'>
                    <TextField
                        control={form.control}
                        name='confirmPassword'
                        label={
                            <span>
                                Confirm Password <span className='text-red-500 ml-1'>*</span>
                            </span>
                        }
                        type={isConfirmPasswordVisible ? 'text' : 'Confirm New Password'}
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}>
                                    {isConfirmPasswordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </IconButton>
                            ),
                        }}
                    />
                </div>
            </div>
            <div className='mt-20'>
                <Button
                    variant='primary'
                    text='Change Password'
                    type='submit'
                />
            </div>
        </form>
    );
}

