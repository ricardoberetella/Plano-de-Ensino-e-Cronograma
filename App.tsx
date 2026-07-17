const loadPlans = useCallback(async (profileId: string) => {
    setIsLoading(true);
    try {
      const dbPlans = await FirebaseService.getPlans(profileId);
      
      // Se o Firebase retornar vazio, injetamos um plano de emergência para você conseguir trabalhar
      if (!dbPlans || dbPlans.length === 0) {
        console.warn("Firebase vazio, usando plano de emergência.");
        const emergencyPlan: TeachingPlan = {
          id: 'emergency-plan',
          profileId: profileId,
          courseName: 'Mecânico de Usinagem Convencional',
          totalHours: 800,
          modality: 'Aprendizagem Industrial',
          objective: 'Desenvolvimento técnico.',
          version: '1.0',
          updatedAt: new Date().toISOString(),
          units: [
            { id: "lidt", name: "Leitura e Interpretação de Desenho Técnico", hours: 60, schedule: [], calendar: { start: '', end: '', daysOfWeek: [], exceptions: [] } },
            { id: "crd", name: "Controle Dimensional", hours: 60, schedule: [], calendar: { start: '', end: [], daysOfWeek: [], exceptions: [] } },
            { id: "prusc", name: "Processos de Usinagem Convencional", hours: 160, capabilities: [], knowledges: [], schedule: [], calendar: { start: '', end: '', daysOfWeek: [], exceptions: [] } },
            { id: "mein", name: "Metrologia Industrial", hours: 80, capabilities: [], knowledges: [], schedule: [], calendar: { start: '', end: '', daysOfWeek: [], exceptions: [] } }
          ]
        };
        setPlans([emergencyPlan]);
      } else {
        setPlans(dbPlans);
      }
    } catch (err) {
      console.error("Erro crítico ao carregar Firebase:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);
