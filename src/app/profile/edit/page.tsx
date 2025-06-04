"use client"

import DoujinshiLayout from "@/components/doujinshi/doujinshi-layout/doujinshi-layout";
import EditProfileForm from "@/components/profile/edit-profile-form";


const DoujinshiPage = () => {


    return (
        <DoujinshiLayout >
            <div className="space-y-12.5 py-12.5">
                <div className="text-[22px] font-semibold text-[#FCFCFD]">Edit Profile</div>
                <EditProfileForm />
            </div>
        </DoujinshiLayout>
    );
};

export default DoujinshiPage;