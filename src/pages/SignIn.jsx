import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { motion } from "framer-motion";
import { Building2, ShieldCheck, Users, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { authAPI } from "../services/api";

const SignIn = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await authAPI.login(formData.email, formData.password);
      const { token, role, isApproved } = response.data;

      // Check if user is approved
      if (!isApproved && role === "RESIDENT") {
        setError("Your account is pending admin approval.");
        setIsLoading(false);
        return;
      }

      // Store token
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", role);
      localStorage.setItem("userEmail", response.data.email);

      // Redirect based on role
      setTimeout(() => {
        if (role === "ADMIN") {
          navigate("/admin/dashboard");
        } else {
          navigate("/resident/dashboard");
        }
      }, 100);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (!selectedRole) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl"
        >
          {/* Logo */}
          <Link to="/" className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-2xl text-primary-foreground">SocietyPro</span>
          </Link>

          {/* Role Selection */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary-foreground mb-2">Welcome Back</h1>
            <p className="text-primary-foreground/70">Select how you'd like to sign in</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Admin Card */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Card
                className="cursor-pointer border-2 border-transparent hover:border-accent transition-all h-full"
                onClick={() => setSelectedRole("admin")}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <ShieldCheck className="w-8 h-8 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground mb-2">Sign in as Admin</h2>
                  <p className="text-muted-foreground text-sm">
                    For society committee members and managers with full access to manage residents,
                    complaints, and notices.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Resident Card */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Card
                className="cursor-pointer border-2 border-transparent hover:border-accent transition-all h-full"
                onClick={() => setSelectedRole("resident")}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h2 className="text-xl font-bold text-foreground mb-2">Sign in as Resident</h2>
                  <p className="text-muted-foreground text-sm">
                    For apartment residents to view notices, raise complaints, and track maintenance
                    requests.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Back Link */}
          <div className="mt-8 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  // Login Form
  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
            <Building2 className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-bold text-2xl text-primary-foreground">SocietyPro</span>
        </Link>

        <Card>
          <CardHeader className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              {selectedRole === "admin" ? (
                <ShieldCheck className="w-7 h-7 text-primary" />
              ) : (
                <Users className="w-7 h-7 text-emerald-600" />
              )}
            </div>
            <CardTitle className="text-2xl">
              {selectedRole === "admin" ? "Admin Sign In" : "Resident Sign In"}
            </CardTitle>
            <CardDescription>Enter your credentials to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <Link to="#" className="text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>

              {selectedRole === "resident" && (
                <p className="text-center text-sm text-muted-foreground">
                  New resident?{" "}
                  <Link to="/signup" className="text-primary hover:underline font-medium">
                    Request access
                  </Link>
                </p>
              )}
            </form>

            {/* Change Role */}
            <div className="mt-6 pt-6 border-t border-border text-center">
              <button
                onClick={() => setSelectedRole(null)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Choose different role
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SignIn;