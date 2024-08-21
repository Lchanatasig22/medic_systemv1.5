﻿using System;
using System.Collections.Generic;

namespace medic_system.Models
{
    public partial class Consultum
    {
        public Consultum()
        {
            Cita = new HashSet<Citum>();
        }

        public int IdConsulta { get; set; }
        public DateTime? FechacreacionConsulta { get; set; }
        public string? UsuariocreacionConsulta { get; set; }
        public string? HistorialConsulta { get; set; }
        public string? SecuencialConsulta { get; set; }
        public int? PacienteConsultaP { get; set; }
        public string? MotivoConsulta { get; set; }
        public string? EnfermedadConsulta { get; set; }
        public string? NombreparienteConsulta { get; set; }
        public string? SignosalarmaConsulta { get; set; }
        public string? Reconofarmacologicas { get; set; }
        public int? TipoparienteConsulta { get; set; }
        public string? TelefonoConsulta { get; set; }
        public string? TemperaturaConsulta { get; set; }
        public string? FrecuenciarespiratoriaConsulta { get; set; }
        public string? PresionarterialsistolicaConsulta { get; set; }
        public string? PresionarterialdiastolicaConsulta { get; set; }
        public string? PulsoConsulta { get; set; }
        public string? PesoConsulta { get; set; }
        public string? TallaConsulta { get; set; }
        public string? PlantratamientoConsulta { get; set; }
        public string? ObservacionConsulta { get; set; }
        public string? AntecedentespersonalesConsulta { get; set; }
        public int? AlergiasConsultaId { get; set; }
        public string? Obseralergias { get; set; }
        public int? CirugiasConsultaId { get; set; }
        public string? ObsercirugiasId { get; set; }
        public int? DiasincapacidadConsulta { get; set; }
        public int? MedicoConsultaD { get; set; }
        public int? EspecialidadId { get; set; }
        public int? EstadoConsultaC { get; set; }
        public int? TipoConsultaC { get; set; }
        public string? NotasevolucionConsulta { get; set; }
        public string? ConsultaprincipalConsulta { get; set; }
        public int? ActivoConsulta { get; set; }
        public int? ConsultaMedicamentoId { get; set; }
        public int? ConsultaLaboratorioId { get; set; }
        public int? ConsultaOrganosSistemasId { get; set; }
        public int? ConsultaExamenFisicoId { get; set; }
        public int? ConsultaImagenId { get; set; }
        public int? ConsultaDiagnosticoId { get; set; }
        public int? ConsultaAntecedentesFamiliaresId { get; set; }
        public DateTime? FechaactualConsulta { get; set; }



        public virtual Catalogo? AlergiasConsulta { get; set; }
        public virtual Catalogo? CirugiasConsulta { get; set; }
        public virtual AntecedentesFamiliare? ConsultaAntecedentesFamiliares { get; set; }
        public virtual ConsultaDiagnostico? ConsultaDiagnostico { get; set; }
        public virtual ExamenFisico? ConsultaExamenFisico { get; set; }
        public virtual ConsultaImagen? ConsultaImagen { get; set; }
        public virtual ConsultaLaboratorio? ConsultaLaboratorio { get; set; }
        public virtual ConsultaMedicamento? ConsultaMedicamento { get; set; }
        public virtual OrganosSistema? ConsultaOrganosSistemas { get; set; }
        public virtual Especialidad? Especialidad { get; set; }
        public virtual Usuario? MedicoConsultaDNavigation { get; set; }
        public virtual Paciente? PacienteConsultaPNavigation { get; set; }
        public virtual ICollection<Citum> Cita { get; set; }
    }
}
