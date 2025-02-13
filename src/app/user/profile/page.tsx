"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import UserSidebar from "@/components/user/user-sidebar";
import { toast } from "react-toastify";
import { useUserStore } from "@/store/useUserStore";
import { userService } from "@/_services/common/userService";
import axios from "axios";
import LoadingSpinner from "@/components/LoadingSpinner";

const Address = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fetchUserDetails = useUserStore((state) => state.fetchUserDetails);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    number: '',
    email: '',
    userId: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.post('/api/auth/me');
        setFormData({
          email: data.user.email,
          number: data.user.number,
          userId: data.user._id,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await userService.updateProfile(formData);
      console.log(response);
      fetchUserDetails();
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error("Failed to update address");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Breadcrumb title={"Address"} />
      <section className="section-about py-[50px] max-[1199px]:py-[35px]">
        <div className="flex flex-wrap justify-between items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full mb-[-24px]">
            <UserSidebar activemenu={'profile'} />
            <div className="flex-1 p-6 pt-0">
              <div className="bg-purple-600 text-white rounded-lg p-8 flex items-center justify-between mb-6 w-full max-w-full">
                <h2 className="text-lg font-semibold">Profile</h2>
              </div>
              {!formData?.email && (
                <p className="text-red-500 bg-red-200 py-2 px-5 rounded-sm">Please Update Your Profile</p>
              )}
              <div className="bg-white px-5 py-5">
                <div className="input-box-form mt-[20px]">
                  <form method="post" onSubmit={handleSubmit}>
                    <div className="flex flex-wrap mx-[-12px]">
                      <div className="min-[992px]:w-[50%] w-full px-[12px]">
                        <div className="input-item mb-[24px]">
                          <label className="inline-block font-Poppins leading-[26px] tracking-[0.02rem] mb-[8px] text-[14px] font-medium text-[#3d4750]">
                            Number *
                          </label>
                          <input
                            type="text"
                            name="number"
                            placeholder="Enter your Number"
                            className="w-full p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] leading-[26px] outline-[0] rounded-[10px]"
                            value={formData.number}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="min-[992px]:w-[50%] w-full px-[12px]">
                        <div className="input-item mb-[24px]">
                          <label className="inline-block font-Poppins leading-[26px] tracking-[0.02rem] mb-[8px] text-[14px] font-medium text-[#3d4750]">
                            Email *
                          </label>
                          <input
                            type="email"
                            name="email"
                            placeholder="Enter your Email"
                            className="w-full p-[10px] text-[14px] font-normal text-[#686e7d] border-[1px] border-solid border-[#eee] leading-[26px] outline-[0] rounded-[10px]"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="w-full px-[12px]">
                        <div className="input-button">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bb-btn-2 inline-block items-center justify-center check-btn transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] py-[4px] px-[25px] text-[14px] font-normal text-[#fff] bg-[#6c7fd8] rounded-[10px] border-[1px] border-solid border-[#6c7fd8] hover:bg-transparent hover:border-[#3d4750] hover:text-[#3d4750]"
                          >
                            {isSubmitting ? 'Saving...' : 'Save Address'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Address;
