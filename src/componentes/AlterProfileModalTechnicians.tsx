import { AxiosError } from "axios";
import { useState } from "react";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function AlterProfileModalTechnicians({ open, onClose }: Props) {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { session } = useAuth();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      if (!session?.user.id) {
        alert("Usuário não identificado.");
        return;
      }

      if (!password || !newPassword) {
        alert("Preencha a senha atual e a nova senha.");
        return;
      }

      if (newPassword.length < 6) {
        alert("A nova senha deve ter no mínimo 6 dígitos.");
        return;
      }

      setIsLoading(true);

      await api.patch(`/users/${session.user.id}/password`, {
        password,
        newPassword,
      });

      alert("Senha alterada com sucesso.");
      setPassword("");
      setNewPassword("");
      onClose();
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.response?.data?.message ?? "Erro ao alterar senha.");
        return;
      }

      alert("Não foi possível alterar a senha.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleClose() {
    setPassword("");
    setNewPassword("");
    onClose();
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <form
        onSubmit={onSubmit}
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full max-w-[360px] rounded-2xl shadow-lg p-5"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-gray-700">Alterar senha</h2>

          <button
            type="button"
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-800 text-xl cursor-pointer"
          >
            ✕
          </button>
        </div>

        <div className="mb-3">
          <label className="text-xs font-bold text-gray-600 block mb-1">
            SENHA ATUAL
          </label>
          <input
            type="password"
            placeholder="Digite sua senha atual"
            className="w-full border-b border-gray-300 focus:border-blue-600 outline-none text-sm py-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label className="text-xs font-bold text-gray-600 block mb-1">
            NOVA SENHA
          </label>
          <input
            type="password"
            placeholder="Digite sua nova senha"
            className="w-full border-b border-gray-300 focus:border-blue-600 outline-none text-sm py-1"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <p className="text-gray-400 mt-1 text-sm">Mínimo de 6 dígitos</p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gray-800 text-white text-sm font-medium py-3 rounded-xl hover:bg-gray-900 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Salvando..." : "Salvar"}
        </button>
      </form>
    </div>
  );
}