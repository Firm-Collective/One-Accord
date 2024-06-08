// hooks/useChangePasswordForm.ts
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm, FieldErrorsImpl } from 'react-hook-form';
import { z } from 'zod';
import { ChangePasswordSchema, type ChangePasswordSchemaType } from '@/components/authentication/schemas';
import { useMutation } from 'react-query';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";

const useChangePasswordForm = () => {
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof ChangePasswordSchema>>({
        resolver: zodResolver(ChangePasswordSchema),
        defaultValues: {
            newPassword: '',
            confirmPassword: '',
        },
    });

    const changePasswordMutation = useMutation({
        mutationFn: (passwordData: ChangePasswordSchemaType) => {
            return axios.post('/api/change-password', passwordData);
        },
        onSuccess: () => {
            router.push('/change-password/success');
            toast({
                title: 'Password changed successfully!',
                description: 'You have successfully changed your password.',
                variant: 'success',
                duration: 5000,
            });
        },
        onError: (error) => {
            console.log('error', error);
            toast({
                title: 'Password change failed',
                description: 'There was an error changing your password. Please try again.',
                variant: 'destructive',
                duration: 5000,
            });
        },
    });

    const onValid = async (data: ChangePasswordSchemaType) => {
        changePasswordMutation.mutate(data);
    };

    const onInvalid = (errors: Partial<FieldErrorsImpl<ChangePasswordSchemaType>>) => {
        console.error("onInvalid", errors);
    };

    return {
        form,
        onValid,
        onInvalid,
        changePasswordMutation,
    };
}

export default useChangePasswordForm;
