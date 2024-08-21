﻿using System;
using System.Collections.Generic;

namespace medic_system.Models
{
    public partial class ConsultaDiagnostico
    {
        public ConsultaDiagnostico()
        {
            Consulta = new HashSet<Consultum>();
        }

        public int IdConsultaDiagnostico { get; set; }
        public int? DiagnosticoId { get; set; }
        public string? ObservacionDiagnostico { get; set; }
        public bool? PresuntivoDiagnosticos { get; set; }
        public bool? DefinitivoDiagnosticos { get; set; }
        public int? EstadoDiagnostico { get; set; }
        public int? ConsultaId { get; set; }
        public int? SecuencialConsultaDiag { get; set; }

        public virtual Diagnostico? Diagnostico { get; set; }
        public virtual ICollection<Consultum> Consulta { get; set; }
    }
}
