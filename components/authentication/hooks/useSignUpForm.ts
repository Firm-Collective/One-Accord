import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useForm, FieldErrorsImpl } from 'react-hook-form';
import { z } from 'zod';
import { SignUpSchema, type SignUpSchemaType } from '@/components/authentication/schemas';
import { useMutation } from 'react-query';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { useToast } from "@/hooks/use-toast";

const useSignUpForm = () => {
  const supaClient = createClient()
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
          email: '',
          password: '',
        },
      });
    
      const signInMutation = useMutation({
         mutationFn: async (signUpData: SignUpSchemaType) => {
          return await axios.post('/api/auth/signup', signUpData);
          
        },
        onSuccess: () => {
          router.push('/profile');
        },
        onError: (error) => {
          console.log('error', error);
        },
      });

      const checkForDuplicates = async (x: { email: string; password: string }, ctx: any ): Promise<any> => {
       
        const {data, error } = await supaClient
          .from("User")
          .select("*")
          .or(`email.eq.${x.email}`);
      
        if (error) {
          console.error('Error querying the database:', error);
          throw new Error('An issue occurred with the User table.');
        }
      
        if (data.length > 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `El email "${x.email}" ya existe.`,
            path: ["email"],
          });

          toast({
            title: "Error",
            description: "The email already exist",
            variant: "destructive",
          });
        }    
        return z.never;
      };
    
      const onValid = async (data: SignUpSchemaType) => {

        try {
          const parsedValues = await SignUpSchema
          .superRefine(async (x, ctx) => {
            await checkForDuplicates(x, ctx);
          })
          .safeParseAsync(data);
  
        if (!parsedValues.success) {
          type K = keyof SignUpSchemaType;
          parsedValues.error.errors.forEach((v) =>
            form.setError(v.path.join(".") as K, { message: v.message })
          );
          return;
        } 

        signInMutation.mutate(data);
       
      } catch (error) {
        console.error('An issue occurred with creating the new user.', error)
        
      }

    };

      const onInvalid = (errors: Partial<FieldErrorsImpl<SignUpSchemaType>>) => {
        console.error("onInvalid", errors);
      };

      return {
        form,
        onValid,
        onInvalid,
        signInMutation,
      }
    
}

export default useSignUpForm;