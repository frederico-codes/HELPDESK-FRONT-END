import { X } from "phosphor-react";
import trash from "../assets/icons/trash.svg";
import { useEffect, useState } from "react";
import { Input } from "../componentes/Input";
import { Upload } from "./Upload";


interface Props {
  open: boolean;
  onClose: () => void;
  onOpenAlterProfile: () => void;
  onSave: (data: {
    name: string;
    email: string;
    avatarFile: File | null;
  }) => Promise<void> | void;
  onDeleteAccount: () => Promise<void> | void;
  initialName?: string;
  initialEmail?: string;
  initialAvatar?: string | null;
  isLoading?: boolean;
}

export function ProfileModalCustomer({
  open,
  onClose,
  onOpenAlterProfile,
  onSave,
  onDeleteAccount,
  initialName,
  initialEmail,
  initialAvatar, 
  isLoading = false,
}: Props) {
  const [name, setName] = useState(initialName || "");
  const [email, setEmail] = useState(initialEmail || "");
  const [password, setPassword] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    if (open) {
      setName(initialName || "");
      setEmail(initialEmail || "");
      setPassword("");
      setAvatarFile(null);
    }
  }, [open, initialName, initialEmail]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    await onSave({
      name,
      email,
      avatarFile,
    });

    onClose();
  }

  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 bg-black/40 z-50
        flex items-center justify-center
        px-4 sm:px-0
      "
      onClick={onClose}
    >
      <form
        onSubmit={onSubmit}
        onClick={(e) => e.stopPropagation()}
        className="
          bg-white rounded-2xl shadow-lg animate-fade
          w-full max-w-[440px]
        "
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-500">
          <h2 className="text-lg font-semibold text-gray-900">Perfil</h2>

          <button type="button" onClick={onClose}>
            <X
              size={22}
              className="text-gray-700 hover:text-gray-500 cursor-pointer"
            />
          </button>
        </div>

        <div className="px-6 py-5 space-y-6">
          <div className="flex items-center gap-4">
            <Upload
              filename={null}
              initialPreview={initialAvatar}
              onFileChange={setAvatarFile} />

              <img 
              src={trash} 
              alt="lixeira"  
              className="cursor-pointer bg-gray-500 w-5 h-5 '"
               onClick={() => {
                 onDeleteAccount();
                }}              
              />
          </div>

          <div>
            <Input
              name="name"
              required
              legend="Nome"
              type="text"
              placeholder="Carlos Silva"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <Input
              name="email"
              required
              legend="E-mail"
              type="email"
              placeholder="exemplo@mail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <div className="flex items-end justify-between gap-3">
              <div className="flex-1">
                <Input
                  name="password"
                  legend="Senha"
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button
                type="button"
                className="px-3 py-1.5 rounded-md bg-gray-500 text-gray-700 hover:bg-gray-50 text-sm cursor-pointer"
                onClick={() => {
                  onClose();
                  onOpenAlterProfile();
                }}
              >
                Alterar
              </button>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6">
          <button
            type="submit"
            disabled={isLoading}
            className="
              w-full bg-gray-900 text-white py-3 rounded-md
              font-medium text-sm hover:bg-gray-500 transition cursor-pointer hover:text-gray-200
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {isLoading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </div>
  );
}