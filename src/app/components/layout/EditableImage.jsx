import Image from "next/image";
import toast from "react-hot-toast";

export default function EditableImage({ link, setLink }) {
  async function handleProfileImage(e) {
    const files = e.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set('file', files[0]);

      const uploadPromise = fetch('/api/upload', {
        method: 'POST',
        body: data,
      }).then(async (response) => {
        if (response.ok) {
          const newLink = await response.json();
          setLink(newLink);
          return newLink; 
        } else {
          throw new Error('Something went wrong');
        }
      });

      await toast.promise(uploadPromise, {
        loading: 'Uploading...',
        success: 'Upload complete',
        error: 'Upload error',
      });
    }
  }

  return (
    <>
      {link && (
        <Image className="rounded-lg w-full h-full mb-1" src={link} width={250} height={250} alt={'avatar'} />
      )}
      {!link && (
        <div className="text-center bg-gray-200 p-4 text-gray-500 rounded-lg mb-1">
          No image
        </div>
      )}
      <label>
        <input type="file" className="hidden" onChange={handleProfileImage} />
        <span className="block border border-gray-300 rounded-lg p-2 text-center cursor-pointer">Change image</span>
      </label>
    </>
  );
}
