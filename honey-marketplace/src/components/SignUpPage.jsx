import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Alert, AlertDescription } from './ui/alert';
import {
  Shield,
  User,
  Mail,
  Lock,
  Upload,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Hexagon,
  Users,
  FileText,
  Star,
  ArrowLeft,
  Loader2
} from 'lucide-react';

const SignUpPage = () => {
  const [userRole, setUserRole] = useState('customer');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  // Form data state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    licenseNumber: '',
    licenseFile: null,
    customerAgreement: false,
    producerAgreement: false
  });

  // Validation state
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);



  // Password strength calculation
  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    // Common validations
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Role-specific validations
    if (userRole === 'producer') {
      if (!formData.licenseNumber.trim()) {
        newErrors.licenseNumber = 'Commercial license number is required';
      }

      if (!formData.licenseFile) {
        newErrors.licenseFile = 'License PDF upload is required';
      }

      if (!formData.producerAgreement) {
        newErrors.producerAgreement = 'You must agree to the license visibility terms';
      }
    } else {
      if (!formData.customerAgreement) {
        newErrors.customerAgreement = 'You must acknowledge the license verification terms';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }

    // Update password strength
    if (field === 'password') {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  // Handle role change with form reset
  const handleRoleChange = (newRole) => {
    setUserRole(newRole);

    // Clear role-specific form data and errors when switching roles
    setFormData(prev => ({
      ...prev,
      licenseNumber: '',
      licenseFile: null,
      customerAgreement: false,
      producerAgreement: false
    }));

    // Clear role-specific errors
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.licenseNumber;
      delete newErrors.licenseFile;
      delete newErrors.customerAgreement;
      delete newErrors.producerAgreement;
      return newErrors;
    });
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        setErrors(prev => ({ ...prev, licenseFile: 'Please upload a PDF file' }));
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({ ...prev, licenseFile: 'File size must be less than 5MB' }));
        return;
      }
      setFormData(prev => ({ ...prev, licenseFile: file }));
      setErrors(prev => ({ ...prev, licenseFile: '' }));
    }
  };

  // Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  setIsLoading(true);

  try {
    // Prepare user data for registration
    const userData = {
      name: formData.fullName,
      email: formData.email,
      password: formData.password,
      role: userRole, // 'customer' or 'producer'
    };

    // Call the signup function from AuthContext
    const result = await signup(userData);
    console.log("User created:", result);

    // Redirect on success
    navigate("/login", {
      state: {
        message: "Account created successfully! Please log in to continue.",
        type: "success",
      },
    });
  } catch (error) {
    console.error("Sign up error:", error);
    setErrors({ submit: error.message || "Failed to create account. Please try again." });
  } finally {
    setIsLoading(false);
  }
};



  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return 'Weak';
    if (passwordStrength <= 3) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            Back to Marketplace
          </Link>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Hexagon className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-serif font-bold">BeeSure</h1>
          </div>
          <p className="text-muted-foreground">Create your account to access authentic, blockchain-verified honey</p>
        </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Choose your account type and fill in your details below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Display */}
              {Object.keys(errors).length > 0 && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Please fix the following errors:
                    <ul className="mt-2 list-disc list-inside">
                      {Object.values(errors).map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {/* Role Selection */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">I am a:</Label>
                  <RadioGroup
                    value={userRole}
                    onValueChange={handleRoleChange}
                    className="grid grid-cols-2 gap-4"
                  >
                    <div className={`flex items-center space-x-2 p-4 border-2 rounded-lg transition-all duration-200 cursor-pointer ${
                      userRole === 'customer'
                        ? 'border-amber-400 bg-amber-50 shadow-sm'
                        : 'border-gray-200 hover:border-amber-300'
                    }`}>
                      <RadioGroupItem value="customer" id="customer" className="text-amber-600" />
                      <Label htmlFor="customer" className="flex items-center gap-2 cursor-pointer font-medium">
                        <Users className="w-4 h-4 text-amber-600" />
                        Customer
                      </Label>
                    </div>
                    <div className={`flex items-center space-x-2 p-4 border-2 rounded-lg transition-all duration-200 cursor-pointer ${
                      userRole === 'producer'
                        ? 'border-amber-400 bg-amber-50 shadow-sm'
                        : 'border-gray-200 hover:border-amber-300'
                    }`}>
                      <RadioGroupItem value="producer" id="producer" className="text-amber-600" />
                      <Label htmlFor="producer" className="flex items-center gap-2 cursor-pointer font-medium">
                        <Hexagon className="w-4 h-4 text-amber-600" />
                        Honey Producer
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

              {/* Common Form Fields */}
              <div className="space-y-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">
                    {userRole === 'producer' ? 'Full Name / Trade Name' : 'Full Name'}
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder={userRole === 'producer' ? 'Enter your full name or trade name' : 'Enter your full name'}
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      required
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  {formData.password && (
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                            style={{ width: `${(passwordStrength / 5) * 100}%` }}
                          />
                        </div>
                        <span className={`text-xs font-medium ${
                          passwordStrength <= 2 ? 'text-red-600' :
                          passwordStrength <= 3 ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                          {getPasswordStrengthText()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      required
                      disabled={isLoading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      Passwords do not match
                    </p>
                  )}
                  {formData.confirmPassword && formData.password === formData.confirmPassword && formData.password && (
                    <p className="text-sm text-green-600 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Passwords match
                    </p>
                  )}
                </div>
              </div>

              {/* Producer-Specific Fields */}
              {userRole === 'producer' && (
                <div className="space-y-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Hexagon className="w-5 h-5 text-amber-600" />
                    <h3 className="font-semibold">Producer Information</h3>
                  </div>

                  {/* License Number */}
                  <div className="space-y-2">
                    <Label htmlFor="licenseNumber">Commercial License Number</Label>
                    <Input
                      id="licenseNumber"
                      type="text"
                      placeholder="Enter your commercial license number"
                      value={formData.licenseNumber}
                      onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                      required
                      disabled={isLoading}
                    />
                  </div>

                  {/* License File Upload */}
                  <div className="space-y-2">
                    <Label htmlFor="licenseFile">Upload License PDF</Label>
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="licenseFile"
                        className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors border-gray-300 hover:border-amber-400"
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-2 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">Click to upload</span> your license PDF
                          </p>
                          <p className="text-xs text-gray-500">PDF files only (MAX. 5MB)</p>
                          {formData.licenseFile && (
                            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                              <CheckCircle className="w-3 h-3" />
                              {formData.licenseFile.name}
                            </p>
                          )}
                        </div>
                        <input
                          id="licenseFile"
                          type="file"
                          className="hidden"
                          accept=".pdf"
                          onChange={handleFileUpload}
                          required
                          disabled={isLoading}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Agreement Checkboxes */}
              <div className="space-y-4">
                {userRole === 'customer' ? (
                  <div className={`flex items-start space-x-4 p-6 rounded-xl border-2 transition-all duration-200 ${
                    formData.customerAgreement
                      ? 'bg-blue-100 border-blue-300 shadow-md'
                      : 'bg-blue-50 border-blue-200 hover:border-blue-300'
                  }`}>
                    <div className="flex-shrink-0 mt-1">
                      <Checkbox
                        id="customerAgreement"
                        checked={formData.customerAgreement}
                        onCheckedChange={(checked) => handleInputChange('customerAgreement', checked)}
                        className="w-5 h-5 border-2 border-blue-400 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2 flex-1">
                      <Label
                        htmlFor="customerAgreement"
                        className="text-base font-semibold cursor-pointer leading-relaxed block"
                      >
                        <span className="text-blue-700 font-bold">Important Notice:</span>
                      </Label>
                      <Label
                        htmlFor="customerAgreement"
                        className="text-sm cursor-pointer leading-relaxed block"
                      >
                        I understand that BeeSure is not responsible for verifying producer licenses. License details are provided, but it is the customer's responsibility to check them.
                      </Label>
                    </div>
                  </div>
                ) : (
                  <div className={`flex items-start space-x-4 p-6 rounded-xl border-2 transition-all duration-200 ${
                    formData.producerAgreement
                      ? 'bg-amber-100 border-amber-300 shadow-md'
                      : 'bg-amber-50 border-amber-200 hover:border-amber-300'
                  }`}>
                    <div className="flex-shrink-0 mt-1">
                      <Checkbox
                        id="producerAgreement"
                        checked={formData.producerAgreement}
                        onCheckedChange={(checked) => handleInputChange('producerAgreement', checked)}
                        className="w-5 h-5 border-2 border-amber-400 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600 focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                        required
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2 flex-1">
                      <Label
                        htmlFor="producerAgreement"
                        className="text-base font-semibold cursor-pointer leading-relaxed block"
                      >
                        <span className="text-amber-700 font-bold">License Visibility Agreement:</span>
                      </Label>
                      <Label
                        htmlFor="producerAgreement"
                        className="text-sm cursor-pointer leading-relaxed block"
                      >
                        I agree that my commercial license details and uploaded license PDF will be visible to customers on every product I provide.
                      </Label>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center text-sm text-muted-foreground">
              <p>Already have an account? <Link to="/login" className="text-primary hover:underline">Log In</Link></p>
            </div>
          </CardContent>
        </Card>
      </div>
  );
};

export default SignUpPage;
