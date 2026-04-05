import { X } from "phosphor-react"
import { Input } from "./Input";
import { useState } from "react";
import { api } from "../services/api";
import { AxiosError } from "axios";
import { useAuth } from "../hooks/useAuth";

interface Props {
  open: boolean
  onClose: () => void
}

export function AlterProfileModalCustomer({ open, onClose }: Props) {
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


  if (!open) return null

  return (
    <form
      onSubmit={onSubmit}
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
      onClick={onClose}
    >
      {/* MODAL */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full max-w-md
          rounded-2xl bg-white
          shadow-xl
        "
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-500">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="text-gray-700 hover:text-gray-500 cursor-pointer"
            >
              ←
            </button>

            <h2 className="text-base font-semibold">Alterar senha</h2>
          </div>

          <button
            onClick={onClose}
            className="text-gray-700 hover:text-gray-500 cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* CONTEÚDO */}
        <div className="px-6 py-6 space-y-6">
          {/* SENHA ATUAL */}
          <div>
            <Input
              name="password"
              required
              legend="SENHA"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* NOVA SENHA */}
          <div>
            <Input
              name="password"
              required
              legend="NOVA SENHA"
              type="password"
              placeholder="Digite sua nova senha"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <span className="mt-1 block text-xs text-gray-400">
              Mínimo de 6 dígitos
            </span>
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-6 pb-6">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gray-800 text-white text-sm font-medium py-3 rounded-xl hover:bg-gray-900 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </form>
  );
}
