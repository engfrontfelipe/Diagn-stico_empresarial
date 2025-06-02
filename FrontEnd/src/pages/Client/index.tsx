
  export const handleGeneratePDF = async () => {
    try {
      const response = await fetch('http://localhost:3333/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Relatório Simples',
          content: 'Este é um exemplo de conteúdo enviado pelo frontend.',
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao gerar o PDF');
      }

      // Recebe o PDF como blob
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Cria link para download
      const a = document.createElement('a');
      a.href = url;
      a.download = 'relatorio.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
    }
  };

