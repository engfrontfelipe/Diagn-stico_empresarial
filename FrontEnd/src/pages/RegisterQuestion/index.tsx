// Imports mantidos como estavam
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { toast, Toaster } from "sonner";
import { ThemeToggle } from "@/lib/changeButton";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const apiUrl =
  "https://backend-grove-diagnostico-empresarial.xjjkzc.easypanel.host/";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
function QuestionManagement() {
  const [formData, setFormData] = useState({
    texto_pergunta: "",
    departamento: "",
    oportunidade: "",
  });

  const [perguntas, setPerguntas] = useState<any[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [departamentoFiltro, setDepartamentoFiltro] = useState<string>("");

  const fetchPerguntas = async (departamentoFiltro = "") => {
    try {
      const url = departamentoFiltro
        ? `${apiUrl}/questions/filterByDepartment?departamento=${departamentoFiltro}`
        : `${apiUrl}/questions/list`;

      const response = await fetch(url);
      const data = await response.json();
      setPerguntas(data);
    } catch (error) {
      toast.error("Erro ao buscar perguntas!");
    }
  };

  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    fetchPerguntas();
  }, []);

  const handleDepartamentoFiltroChange = (departamento: string) => {
    setDepartamentoFiltro(departamento);
    fetchPerguntas(departamento);
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    // Verifica se algum campo está vazio
    const camposVazios = Object.entries(formData).filter(
      ([_, valor]) => !valor,
    );

    if (camposVazios.length > 0) {
      toast.error("Preencha todos os campos antes de salvar!");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/questions/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Verifica se a resposta da API é bem-sucedida
      if (!response.ok) {
        const errorData = await response.json();
        const errorMessage = errorData?.error || "Erro desconhecido";
        toast.error(`Erro: ${errorMessage}`);
        return;
      }

      toast.success("Pergunta cadastrada com sucesso!");
      setFormData({
        texto_pergunta: "",
        departamento: formData.departamento,
        oportunidade: "",
      });

      await fetchPerguntas();
    } catch (error) {
      console.error("Erro inesperado:", error);
      toast.error("Erro ao cadastrar pergunta. Tente novamente mais tarde.");
    } finally {
      setIsButtonDisabled(false);
    }
  };

  const [editData, setEditData] = useState({
    id_pergunta: "",
    texto_pergunta: "",
    departamento: "",
    oportunidade: "",
  });

  const handleChangeEdit = (e: any) => {
    setEditData({ ...editData, [e.target.id]: e.target.value });
  };

  const handleUpdate = async () => {
    const { id_pergunta, ...updatedFields } = editData;

    if (!id_pergunta) {
      toast.error("ID inválido. Não foi possível atualizar a pergunta.");
      return;
    }

    const payload = {
      ...updatedFields,
      oportunidade: updatedFields.oportunidade,
    };

    try {
      const response = await fetch(
        `${apiUrl}/questions/update/${id_pergunta}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) throw new Error("Erro ao atualizar");

      toast.success("Pergunta atualizada!");
      fetchPerguntas();
    } catch (error) {
      toast.error("Erro ao atualizar pergunta");
    }
  };

  const renderLoading = () => (
    <div className="flex justify-center items-center h-screen">
      <div className="w-16 h-16 border-4 border-t-4 border-accent border-solid rounded-full animate-spin border-t-primary"></div>
    </div>
  );

  if (!perguntas || perguntas.length === 0) {
    return renderLoading();
  }

  return (
    <>
      <div
        className={`flex justify-between align-middle mb-4 p-5 bg-background fixed z-10 w-full top-0 left-0 border-b-2 border-accent transition-transform duration-300 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <h1 className="text-2xl font-semibold ml-3">
          Gerenciamento de Perguntas
        </h1>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link to={"/dashboard"} className=" w-5 h-5 flex items-center mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-house-icon lucide-house"
            >
              <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
              <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            </svg>{" "}
          </Link>
        </div>
      </div>
      <div className="flex flex-col px-4 lg:px-6 gap-4 mt-4">
        <Card className="p-4 w-full mt-20">
          <h1 className="text-center font-medium text-[19px]">
            Criar Pergunta
          </h1>
          <div className="grid  gap-4">
            <div>
              <Label className="mb-3" htmlFor="texto_pergunta">
                Texto da Pergunta
              </Label>
              <Input
                id="texto_pergunta"
                required
                placeholder="Digite o texto da pergunta"
                value={formData.texto_pergunta}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label className="mb-3">Departamento</Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange("departamento", value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione o departamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="RH">RH</SelectItem>
                  <SelectItem value="Financeiro">Financeiro</SelectItem>
                  <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                  <SelectItem value="Operações">Operações</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Vendas">Vendas</SelectItem>
                  <SelectItem value="Estratégias">Estratégias</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="oportunidade" className="mb-3">
                Oportunidade
              </Label>
              <Input
                id="oportunidade"
                placeholder="Digite a oportunidade"
                value={formData.oportunidade}
                onChange={handleChange}
                className="w-full"
              />
            </div>
          </div>
          <Button
            className="w-full mt-4 cursor-pointer"
            onClick={() => {
              setIsButtonDisabled(true);
              handleSubmit();
            }}
            disabled={
              isButtonDisabled ||
              Object.values(formData).some((value) => !value)
            }
          >
            {isButtonDisabled ? (
              <div className="flex justify-center items-center space-x-2 cursor-pointer">
                <div className="w-4 h-4 border-2 border-t-transparent border-blue-500 rounded-full animate-spin" />
                <span></span>
              </div>
            ) : (
              "Cadastrar Pergunta"
            )}
          </Button>
        </Card>

        <Card className="p-4 w-full overflow-x-auto">
          <h1 className="text-center font-medium text-[19px]">
            Tabela de Perguntas
          </h1>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Texto</TableHead>
                <TableHead>
                  Departamento:
                  <select
                    id="filtroDepartamento"
                    value={departamentoFiltro}
                    onChange={(e) =>
                      handleDepartamentoFiltroChange(e.target.value)
                    }
                    className="w-20 p-2 border border-gray-300 rounded"
                  >
                    <option value="">Todos</option>
                    <option value="RH">RH</option>
                    <option value="Financeiro">Financeiro</option>
                    <option value="Tecnologia">Tecnologia</option>
                    <option value="Operações">Operações</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Vendas">Vendas</option>
                    <option value="Estratégias">Estratégias</option>
                  </select>
                </TableHead>
                <TableHead>Oportunidade</TableHead>

                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {perguntas.map((pergunta) => (
                <TableRow key={pergunta.id_pergunta}>
                  <TableCell>{pergunta.texto_pergunta}</TableCell>
                  <TableCell>{pergunta.departamento}</TableCell>
                  <TableCell>{pergunta.oportunidade}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger
                        onClick={() =>
                          setEditData({
                            id_pergunta: pergunta.id_pergunta,
                            texto_pergunta: pergunta.texto_pergunta,
                            departamento: pergunta.departamento,
                            oportunidade: pergunta.oportunidade,
                          })
                        }
                      >
                        <Pencil className="cursor-pointer" size={20} />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className="mb-5 text-2xl text-center">
                            Editar Pergunta
                          </DialogTitle>
                          <DialogDescription className="grid grid-cols-2 gap-4 w-full">
                            <div>
                              <Label className="mb-3" htmlFor="texto_pergunta">
                                Texto da Pergunta
                              </Label>
                              <Input
                                id="texto_pergunta"
                                value={editData.texto_pergunta}
                                onChange={handleChangeEdit}
                              />
                            </div>

                            <div>
                              <Label className="mb-3" htmlFor="departamento">
                                Departamento
                              </Label>
                              <Select
                                value={editData.departamento}
                                onValueChange={(value) =>
                                  setEditData({
                                    ...editData,
                                    departamento: value,
                                  })
                                }
                              >
                                <SelectTrigger
                                  className="w-full"
                                  id="departamento"
                                >
                                  <SelectValue placeholder="Selecione o departamento" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="RH">RH</SelectItem>
                                  <SelectItem value="Financeiro">
                                    Financeiro
                                  </SelectItem>
                                  <SelectItem value="Tecnologia">
                                    Tecnologia
                                  </SelectItem>
                                  <SelectItem value="Operações">
                                    Operações
                                  </SelectItem>
                                  <SelectItem value="Marketing">
                                    Marketing
                                  </SelectItem>
                                  <SelectItem value="Vendas">Vendas</SelectItem>
                                  <SelectItem value="Estratégias">
                                    Estratégias
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <Label className="mb-3" htmlFor="oportunidade">
                                Oportunidade
                              </Label>
                              <Input
                                id="oportunidade"
                                value={editData.oportunidade}
                                onChange={handleChangeEdit}
                              />
                            </div>
                          </DialogDescription>
                          <div className="flex flex-col gap-2 mt-4">
                            <Button
                              onClick={() => {
                                handleUpdate();
                              }}
                            >
                              Salvar
                            </Button>
                          </div>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      <Toaster position="bottom-center" richColors closeButton />
    </>
  );
}

export default QuestionManagement;
