"use client"

import DoujinshiLayout from "@/components/doujinshi/doujinshi-layout/doujinshi-layout";
import DoujinshiUploader from "@/components/uploader/doujinshi-uploader";


const UploaderPage = () => {

    return (
        <DoujinshiLayout >
            <div className="space-y-12.5 py-12.5">
                <DoujinshiUploader />
            </div>
        </DoujinshiLayout>
    );
};

export default UploaderPage;