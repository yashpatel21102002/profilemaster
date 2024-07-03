import { UploadDropzone } from "./uploadcomponents";

type Props = {
  apiEndPoint: "profileImage" | "Resume";
};
const FileUpload = ({ apiEndPoint }: Props) => {
  //   upload dropzone
  return (
    <div className="w-full bg-muted/30">
      <UploadDropzone
        endpoint={apiEndPoint}
        onUploadError={(error: Error) => {
          console.log(error);
        }}
      />
    </div>
  );
};

export default FileUpload;
