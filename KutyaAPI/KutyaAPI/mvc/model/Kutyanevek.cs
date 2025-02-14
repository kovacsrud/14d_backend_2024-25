﻿using System;
using System.Collections.Generic;

namespace KutyaAPI.mvc.model;

public partial class Kutyanevek
{
    public int Id { get; set; }

    public string Kutyanev { get; set; } = null!;

    public virtual ICollection<Kutya> Kutyas { get; set; } = new List<Kutya>();
}
