import Image from "next/image";
import toast from "react-hot-toast";

export default function EditableImage({ link, setlink }) {
  async function handleProfileImage(e) {
    const files = e.target.files;

    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      const uploadPromise = fetch("/api/upload", {
        method: "POST",
        body: data,
      })
        .then((response) => {
          if (response.ok) {
            return response.json().then((link) => {
              setlink(link);
            });
          }
          throw new Error("Response not OK");
        })
        .catch((error) => {
          console.error("Error during file upload:", error);
          throw error; // Rethrow the error to propagate it for the toast promise
        });

      try {
        await toast.promise(uploadPromise, {
          loading: "Uploading...",
          success: "Profile saved!",
          error: (errorDetails) => {
            // Handle the error message based on errorDetails
            console.error("Error saving profile:", errorDetails);
            return "Profile save failed.";
          },
        });
      } catch (error) {
        console.error("Error during toast promise:", error);
      }
    }
  }

  return (
    <>
      {link && (
        <Image
          className="rounded-lg w-full h-full mb-1"
          src={link}
          width={80}
          height={80}
          alt={"avatar"}
        />
      )}

      {!link && (
        <div className="bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
          No image
        </div>
      )}

      <label>
        <input className="hidden" type="file" onChange={handleProfileImage} />
        <span className="block border border-gray-300 rounded-lg p-2 cursor-pointer ">
          Edit
        </span>
      </label>
    </>
  );
}
