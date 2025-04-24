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
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
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
    importancia: "",
    urgencia: "",
    facilidade_implementacao: "",
    priorizacao: "",
  });

  const [perguntas, setPerguntas] = useState<any[]>([]);

  const fetchPerguntas = async () => {
    try {
      const response = await fetch("http://localhost:3333/questions/list");
      const data = await response.json();
      setPerguntas(data);
    } catch (error) {
      toast.error("Erro ao buscar perguntas!");
    }
  };

  useEffect(() => {
    fetchPerguntas();
  }, []);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3333/questions/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(`Erro: ${errorData.error}`);
        return;
      }

      toast.success("Pergunta cadastrada com sucesso!");
      setFormData({
        texto_pergunta: "",
        departamento: "",
        oportunidade: "",
        importancia: "",
        urgencia: "",
        facilidade_implementacao: "",
        priorizacao: "",
      });
      fetchPerguntas();
    } catch (error) {
      toast.error("Erro ao cadastrar pergunta!");
    }
  };

  const [editData, setEditData] = useState({
    id_pergunta: "",
    texto_pergunta: "",
    departamento: "",
    oportunidade: "",
    importancia: "",
    urgencia: "",
    facilidade_implementacao: "",
    priorizacao: "",
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
      importancia: updatedFields.importancia,
      urgencia: updatedFields.urgencia,
      facilidade_implementacao: updatedFields.facilidade_implementacao,
      prioridade: updatedFields.priorizacao,
    };
  
    console.log("Enviando dados para atualização:", payload); // 🐛 Debug
  
    try {
      const response = await fetch(`http://localhost:3333/questions/update/${id_pergunta}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) throw new Error("Erro ao atualizar");
  
      toast.success("Pergunta atualizada!");
      fetchPerguntas();
    } catch (error) {
      console.error("Erro ao atualizar pergunta:", error); // 🐛 Debug
      toast.error("Erro ao atualizar pergunta");
    }
  };
  
  


  return (
    <>
        <div className="flex flex-col px-4 lg:px-6 gap-4 mt-4">
          <Card className="p-4 w-full">
            <h1 className="text-center mb-1 text-2xl font-medium">Criar Pergunta</h1>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="mb-3" htmlFor="texto_pergunta">Texto da Pergunta</Label>
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
                <Select onValueChange={(value) => handleSelectChange("departamento", value)}>
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
  <Label htmlFor="oportunidade" className="mb-3">Oportunidade</Label>
  <Input
    id="oportunidade"
    placeholder="Digite a oportunidade"
    value={formData.oportunidade}
    onChange={handleChange}
    className="w-full"
/>
</div>


              <div>
                <Label className="mb-3">Importância</Label>
                <Select onValueChange={(value) => handleSelectChange("importancia", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione a importância" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alta">Alta</SelectItem>
                    <SelectItem value="Média">Média</SelectItem>
                    <SelectItem value="Baixa">Baixa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-3">Urgência</Label>
                <Select onValueChange={(value) => handleSelectChange("urgencia", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione a urgência" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alta">Alta</SelectItem>
                    <SelectItem value="Média">Média</SelectItem>
                    <SelectItem value="Baixa">Baixa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-3">Facilidade</Label>
                <Select onValueChange={(value) => handleSelectChange("facilidade_implementacao", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione a facilidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alta">Alta</SelectItem>
                    <SelectItem value="Média">Média</SelectItem>
                    <SelectItem value="Baixa">Baixa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-3">Priorização</Label>
                <Input
                  type="number"
                  id="priorizacao"
                  value={formData.priorizacao}
                  onChange={handleChange}
                  placeholder="Nível de priorização"
                />
              </div>
            </div>
            <Button className="w-full mt-4" onClick={handleSubmit}>
              Cadastrar Pergunta
            </Button>
          </Card>

          <Card className="p-4 w-full overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Texto</TableHead>
                  <TableHead>Departamento</TableHead>
                  <TableHead>Oportunidade</TableHead>
                  <TableHead>Importância</TableHead>
                  <TableHead>Urgência</TableHead>
                  <TableHead>Facilidade</TableHead>
                  <TableHead>Priorização</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {perguntas.map((pergunta) => (
                  <TableRow key={pergunta.id_pergunta}>
                    <TableCell>{pergunta.texto_pergunta}</TableCell>
                    <TableCell>{pergunta.departamento}</TableCell>
                    <TableCell>{pergunta.oportunidade}</TableCell>
                    <TableCell>{pergunta.importancia}</TableCell>
                    <TableCell>{pergunta.urgencia}</TableCell>
                    <TableCell>{pergunta.facilidade_implementacao}</TableCell>
                    <TableCell>{pergunta.priorizacao}</TableCell>
                    <TableCell>
                    <Dialog>
  <DialogTrigger
    onClick={() =>
      setEditData({
        id_pergunta: pergunta.id_pergunta,
        texto_pergunta: pergunta.texto_pergunta,
        departamento: pergunta.departamento,
        oportunidade: pergunta.oportunidade,
        importancia: pergunta.importancia,
        urgencia: pergunta.urgencia,
        facilidade_implementacao: pergunta.facilidade_implementacao,
        priorizacao: pergunta.priorizacao,
      })
    }
  >
    <Pencil className="cursor-pointer" size={20} />
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className="mb-5 text-2xl text-center">Editar Pergunta</DialogTitle>
      <DialogDescription className="grid grid-cols-2 gap-4 w-full">
        <div>
          <Label htmlFor="texto_pergunta">Texto da Pergunta</Label>
          <Input
            id="texto_pergunta"
            value={editData.texto_pergunta}
            onChange={handleChangeEdit}
          />
        </div>

        <div>
          <Label htmlFor="departamento">Departamento</Label>
          <Select
            value={editData.departamento}
            onValueChange={(value) =>
              setEditData({ ...editData, departamento: value })
            }
          >
            <SelectTrigger className="w-full" id="departamento" >
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
          <Label htmlFor="oportunidade">Oportunidade</Label>
            <Input
              id="oportunidade"
              value={editData.oportunidade}
              onChange={handleChangeEdit}
            /> 
        </div>
        <div>
          <Label htmlFor="importancia">Importância</Label>
          <Select
            value={editData.importancia}
            onValueChange={(value) =>
              setEditData({ ...editData, importancia: value })
            }
          >
            <SelectTrigger className="w-full" id="importancia">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Alta">Alta</SelectItem>
              <SelectItem value="Média">Média</SelectItem>
              <SelectItem value="Baixa">Baixa</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="urgencia">Urgência</Label>
          <Select
            value={editData.urgencia}
            onValueChange={(value) =>
              setEditData({ ...editData, urgencia: value })
            }
          >
            <SelectTrigger className="w-full" id="urgencia">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Alta">Alta</SelectItem>
              <SelectItem value="Média">Média</SelectItem>
              <SelectItem value="Baixa">Baixa</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="facilidade_implementacao">Facilidade</Label>
          <Select
            value={editData.facilidade_implementacao}
            onValueChange={(value) =>
              setEditData({ ...editData, facilidade_implementacao: value })
            }
          >
            <SelectTrigger className="w-full" id="facilidade_implementacao">
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Fácil">Fácil</SelectItem>
              <SelectItem value="Média">Média</SelectItem>
              <SelectItem value="Difícil">Difícil</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="priorizacao">Priorização</Label>
          <Input
            id="priorizacao"
            value={editData.priorizacao}
            onChange={handleChangeEdit}
          />
        </div>
      </DialogDescription>

      <div className="flex flex-col gap-2 mt-4">
        <Button onClick={handleUpdate}>Salvar</Button>
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
      <Link to={"/dashboard"} className="fixed bottom-4 end-4 rounded-full w-13 h-13 flex items-center justify-center ">
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3333333333333333" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-house-icon lucide-house bg-muted p-3 rounded-full h-auto w-15 "><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>      </Link>
      <Toaster position="top-right" richColors closeButton />
    </>
  );
}

export default QuestionManagement;
