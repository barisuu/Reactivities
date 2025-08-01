﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain
{
    public class Activity
    {
        private DateTime _date;
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public required string Title { get; set; }
        public DateTime Date
        {
            get => _date.ToUniversalTime();
            set => _date = value.ToUniversalTime();
        }
        public required string Description { get; set; }
        public required string Category { get; set; }
        public bool IsCancelled { get; set; }
        
        //location props

        public required string City { get; set; }
        public required string Venue { get; set; }
        public  double Latitude { get; set; }
        public double Longitude { get; set; }



    }
}
