"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Textarea,
} from "@/components/ui";
import { BsCameraFill } from "@/public/assets/icons";
import { setUserData } from "@/redux/slices/loginSlice";
import {
  updateProfile,
  updateAvatar,
  changePassword,
} from "@/components/api/apiEndpoints";
import toast from "react-hot-toast";
import ApiFunction from "@/components/api/apiFunction";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { userData } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    bio: "",
    address: "",
    zipCode: "",
  });

  const { post, put } = ApiFunction();

  useEffect(() => {
    if (userData) {
      setFormData({
        fullname: userData.fullname || "",
        username: userData.username || "",
        email: userData.email || "",
        phone: userData.phone || "",
        country: userData.country || "",
        city: userData.city || "",
        bio: userData.bio || "",
        address: userData.address || "",
        zipCode: userData.zipCode || "",
      });
      if (userData.avatar) {
        setAvatarPreview(userData.avatar);
      }
    }
  }, [userData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarUpload = async () => {
    if (!avatarFile) return;

    const formData = new FormData();
    formData.append("avatar", avatarFile);

    try {
      setIsLoading(true);
      // First upload the file
      const uploadResponse = await post("file/upload", formData);

      if (!uploadResponse?.data?.url) {
        throw new Error("Failed to upload image");
      }

      // Then update the user's avatar with the returned URL
      const response = await put(updateAvatar, {
        avatar: uploadResponse.data.url,
      });

      dispatch(setUserData(response.data));
      toast.success("Profile picture updated successfully");
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast.error(
        error.response?.data?.message || "Failed to update profile picture"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await put(updateProfile, formData);
      dispatch(setUserData(response.data));
      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  if (!userData) {
    router.push("/login");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">My Profile</h1>

        <Card className="mb-8">
          <CardHeader className="flex flex-col items-center">
            <div className="relative group">
              <Avatar
                src={avatarPreview || "/default-avatar.png"}
                className="w-32 h-32 text-large"
                alt="Profile"
              />
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-brand-primary rounded-full p-2 cursor-pointer hover:bg-brand-primary/90 transition-colors">
                  <BsCameraFill className="text-white" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                </label>
              )}
            </div>
            {isEditing && avatarFile && (
              <Button
                size="sm"
                color="primary"
                className="mt-2"
                onClick={handleAvatarUpload}
                isLoading={isLoading}
              >
                Save Picture
              </Button>
            )}
          </CardHeader>

          <CardBody>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  required
                />
                <Input
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  required
                />
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  required
                />
                <Input
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                <Input
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                <Input
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                <div className="md:col-span-2">
                  <Textarea
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows={2}
                  />
                </div>
                <Input
                  label="ZIP Code"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                <div className="md:col-span-2">
                  <Textarea
                    label="Bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    rows={3}
                    placeholder="Tell us about yourself..."
                  />
                </div>
              </div>

              <Divider className="my-6" />

              <div className="flex justify-end space-x-4">
                {isEditing ? (
                  <>
                    <Button
                      type="button"
                      variant="flat"
                      onClick={() => {
                        setIsEditing(false);
                        // Reset form to original values
                        setFormData({
                          fullname: userData.fullname || "",
                          username: userData.username || "",
                          email: userData.email || "",
                          phone: userData.phone || "",
                          country: userData.country || "",
                          city: userData.city || "",
                          bio: userData.bio || "",
                          address: userData.address || "",
                          zipCode: userData.zipCode || "",
                        });
                        setAvatarFile(null);
                        setAvatarPreview(userData.avatar || "");
                      }}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" color="primary" isLoading={isLoading}>
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <Button color="primary" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                )}
              </div>
            </form>
          </CardBody>
        </Card>

        {/* Password Update Section */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Change Password</h2>
          </CardHeader>
          <CardBody>
            <form>
              <div className="space-y-4">
                <Input
                  label="Current Password"
                  type="password"
                  disabled={!isEditing}
                />
                <Input
                  label="New Password"
                  type="password"
                  disabled={!isEditing}
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  disabled={!isEditing}
                />
                <div className="flex justify-end">
                  <Button color="primary" disabled={!isEditing}>
                    Update Password
                  </Button>
                </div>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
