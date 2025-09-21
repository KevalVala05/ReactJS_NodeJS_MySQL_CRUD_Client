import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { Chrome } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { authenticatingUser } from '@/redux/authSlice';
import { showSuccessToast } from '@/utils/toastUtils';

const Login = () => {
  const {isLoading} = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch();

  const handleGoogleLogin =  () => {
    dispatch(authenticatingUser());
    showSuccessToast("User authenticated successfully.");
  };

  return (
    <div className="min-h-screen bg-gradient-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-primary text-transparent bg-clip-text">
            Welcome Back
          </h1>
          <p className="text-muted-foreground mt-2">
            Sign in to access your dashboard
          </p>
        </div>

        <Card className="shadow-medium border-0 bg-glass backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <Button
              onClick={handleGoogleLogin}
              variant="outline"
              className="w-full h-11 mb-4 hover:shadow-soft transition-all duration-300"
              disabled={isLoading}
            >
              <Chrome className="w-4 h-4 mr-2" />
              {isLoading ? 'Redirecting...' : 'Continue with Google'}
            </Button>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default Login;
