import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Cpu, HardDrive, Database, Wifi, Globe, Users, Layers, Server } from 'lucide-react';
import { regions } from '@/lib/providerData';
import { formatNumber } from '@/lib/formatUtils';

const fields = [
  { key: "vcpu", label: "vCPU Count", icon: Cpu, min: 1, max: 64, step: 1, unit: "cores" },
  { key: "ram", label: "RAM", icon: Server, min: 0.5, max: 256, step: 0.5, unit: "GB" },
  { key: "ssdStorage", label: "SSD Storage", icon: HardDrive, min: 0, max: 2000, step: 10, unit: "GB" },
  { key: "objectStorage", label: "Object Storage", icon: HardDrive, min: 0, max: 10000, step: 25, unit: "GB" },
  { key: "bandwidth", label: "Monthly Bandwidth", icon: Wifi, min: 0, max: 100000, step: 100, unit: "GB" },
  { key: "dbStorage", label: "Database Storage", icon: Database, min: 0, max: 1000, step: 5, unit: "GB" },
  { key: "requests", label: "Monthly Requests", icon: Globe, min: 0, max: 500000000, step: 1000000, unit: "req" },
  { key: "users", label: "Number of Users", icon: Users, min: 0, max: 1000000, step: 100, unit: "users" },
  { key: "environments", label: "Environments", icon: Layers, min: 1, max: 10, step: 1, unit: "envs" },
];

function ConfigField({ field, value, onChange }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground flex items-center gap-2">
          <field.icon className="w-3.5 h-3.5 text-muted-foreground" />
          {field.label}
        </label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={value}
            onChange={e => onChange(field.key, parseFloat(e.target.value) || 0)}
            className="w-28 h-8 text-right text-sm font-mono bg-secondary border-border"
            min={field.min}
            max={field.max}
            step={field.step}
          />
          <span className="text-xs text-muted-foreground w-10">{field.unit}</span>
        </div>
      </div>
      <Slider
        value={[value]}
        onValueChange={([v]) => onChange(field.key, v)}
        min={field.min}
        max={field.max}
        step={field.step}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>{formatNumber(field.min)}</span>
        <span>{formatNumber(field.max)}</span>
      </div>
    </div>
  );
}

export default function WorkloadConfigurator({ config, onChange }) {
  const handleChange = (key, value) => {
    onChange({ ...config, [key]: value });
  };

  return (
    <section id="configurator" className="scroll-mt-20">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold font-heading">Configure Your Workload</h2>
          <p className="text-muted-foreground mt-1">Adjust parameters to match your infrastructure needs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 p-6 md:p-8 rounded-2xl bg-card border border-border shadow-sm">
        {fields.map(field => (
          <ConfigField key={field.key} field={field} value={config[field.key]} onChange={handleChange} />
        ))}
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground flex items-center gap-2">
            <Globe className="w-3.5 h-3.5 text-muted-foreground" />
            Region
          </label>
          <Select value={config.region} onValueChange={v => handleChange("region", v)}>
            <SelectTrigger className="h-8 text-sm bg-secondary border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {regions.map(r => (
                <SelectItem key={r.id} value={r.id}>{r.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  );
}