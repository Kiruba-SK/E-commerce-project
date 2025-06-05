import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dob: "",
    gender: "",
  });

  const email = localStorage.getItem("email");

  useEffect(() => {
    if (!email) {
      toast.error("Please Login ");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:8000/get_user_profile/?email=${email}`
        );
        const data = await res.json();
        setUser(data);
        setFormData({
          name: data.name || "",
          phone: data.phone || "",
          dob: data.dob || "",
          gender: data.gender || "",
        });
      } catch (error) {
        console.error("Failed to load profile", error);
      }
    };

    fetchProfile();
  }, [email]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const saveProfile = async () => {
    const form = new FormData();
    form.append("email", email);
    form.append("name", formData.name);
    form.append("phone", formData.phone);
    form.append("dob", formData.dob);
    form.append("gender", formData.gender);
    if (selectedImage) {
      form.append("profile_picture", selectedImage);
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/update_user_profile/", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      toast.success(data.message || "Updated!");
      setEditing(false);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white/30 via-gray-400 to-white/30">
      <div className="absolute top-5 right-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm "
        >
          <img
            src={assets.cross_icon}
            className="h-3 w-3 "
            alt=""
          />
         
        </button>
      </div>
      <div className="bg-white shadow-md rounded-xl p-6 w-full max-w-md">
        <div className="text-center mb-6">
          {editing ? (
            <div className="inline-block relative">
              {/* Label wraps image and hidden input together */}
              <label
                htmlFor="profileImageInput"
                className="cursor-pointer block"
              >
                <img
                  src={
                    imagePreview
                      ? imagePreview
                      : user?.profile_picture
                      ? `http://127.0.0.1:8000${user.profile_picture}`
                      : assets.profile
                  }
                  className="w-24 h-24 mx-auto rounded-full object-cover"
                  alt="Profile"
                />
                <input
                  id="profileImageInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  style={{ display: "none" }} // <-- Use inline style for safety
                />
              </label>
            </div>
          ) : (
            <img
              src={
                imagePreview
                  ? imagePreview
                  : user?.profile_picture
                  ? `http://127.0.0.1:8000${user.profile_picture}`
                  : assets.profile
              }
              className="w-24 h-24 mx-auto rounded-full object-cover"
              alt="Profile"
            />
          )}

          <h2 className="text-2xl font-serif mt-3">
            {formData.name || "Loading..."}
          </h2>
        </div>

        {editing ? (
          <>
            <div className="w-[90%] mx-5">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border p-2 mb-3"
                placeholder="Name"
              />
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border p-2 mb-3"
                placeholder="Phone"
              />
              <input
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                className="w-full border p-2 mb-3"
              />
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border p-2 mb-3"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="mx-5 my-2">
              <button
                onClick={saveProfile}
                className="w-full bg-black text-white py-2 mt-4 rounded-md hover:scale-105 transition"
              >
                Save Profile
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="w-[90%] mx-7 my-3">
              <div className="space-y-4">
                <div className="flex">
                  <div className="w-24 font-medium">Email</div>
                  <div className="mx-2">:</div>
                  <div>{email}</div>
                </div>
                <div className="flex">
                  <div className="w-24 font-medium">Phone</div>
                  <div className="mx-2">:</div>
                  <div>{formData.phone || "-"}</div>
                </div>
                <div className="flex">
                  <div className="w-24 font-medium">DOB</div>
                  <div className="mx-2">:</div>
                  <div>{formData.dob || "-"}</div>
                </div>
                <div className="flex">
                  <div className="w-24 font-medium">Gender</div>
                  <div className="mx-2">:</div>
                  <div>{formData.gender || "-"}</div>
                </div>
              </div>
            </div>
            <div className=" mx-5 my-5 ">
              <button
                onClick={() => setEditing(true)}
                className="w-full bg-black text-white mt-4  py-2  rounded-md hover:scale-105 transition"
              >
                Edit Profile
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
