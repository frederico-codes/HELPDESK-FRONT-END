import bin from "../assets/icons/bin.svg";
import uiface from "../assets/uifaces-popular-avatar (2).jpg";
import { useState } from "react";

type Props = React.ComponentProps<"input"> & {
  filename?: string | null;
  onFileChange?: (file: File | null) => void;
};

export function Upload({ filename = null, onFileChange, ...rest }: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setFileName(file.name);
    }

    onFileChange?.(file);
  }

  function handleRemoveImage() {
    setPreview(null);
    setFileName(null);
    onFileChange?.(null);
  }

  return (
    <div className="flex items-center gap-4">
      <img
        src={preview ?? uiface}
        alt="uiavatar"
        className="h-14 w-14 rounded-full object-cover"
      />

      <div className="flex items-center gap-2">
        <label
          htmlFor="upload"
          className="flex items-center gap-2 px-3 py-2 bg-gray-500 rounded-lg cursor-pointer text-sm font-medium text-gray-800 hover:bg-gray-50 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M12 16V4" />
            <path d="M8 8l4-4 4 4" />
            <path d="M20 16v4H4v-4" />
          </svg>

          <span className="text-xs text-gray-100 pl-2">
            {fileName ?? filename ?? "Nova imagem"}
          </span>
        </label>

        <input
          {...rest}
          type="file"
          id="upload"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        <button
          type="button"
          onClick={handleRemoveImage}
          className="p-1 rounded-md bg-gray-500 hover:bg-gray-50 cursor-pointer"
        >
          <img src={bin} alt="remover imagem" />
        </button>
      </div>
    </div>
  );
}