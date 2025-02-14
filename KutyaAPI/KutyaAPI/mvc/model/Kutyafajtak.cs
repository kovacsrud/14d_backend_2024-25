﻿using System;
using System.Collections.Generic;

namespace KutyaAPI.mvc.model;

public partial class Kutyafajtak
{
    public int Id { get; set; }

    public string Nev { get; set; } = null!;

    public string Eredetinev { get; set; } = null!;

    public virtual ICollection<Kutya> Kutyas { get; set; } = new List<Kutya>();
}
