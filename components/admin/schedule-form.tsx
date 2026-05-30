"use client";

import { useState, useEffect } from "react";
import { Field, Input, Section, Select, Checkbox } from "@/components/admin/ui";
import { COUNTRIES } from "@/lib/seed-data";

export function ScheduleForm({ action }: { action: string | ((formData: FormData) => void) }) {
  const [isGlobal, setIsGlobal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [availableCities, setAvailableCities] = useState<{slug: string, name: string}[]>([]);
  const [isLoadingCities, setIsLoadingCities] = useState(false);

  useEffect(() => {
    if (!selectedCountry) {
      setAvailableCities([]);
      return;
    }
    
    setIsLoadingCities(true);
    fetch(`/api/cities?countrySlug=${selectedCountry}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setAvailableCities(data);
        }
      })
      .catch(err => console.error("Failed to fetch cities:", err))
      .finally(() => setIsLoadingCities(false));
  }, [selectedCountry]);

  return (
    <form action={action} className="space-y-4">
      <Section title="Add Schedule">
        <Field label="Start Date" required>
          <Input type="datetime-local" name="startDate" required />
        </Field>
        <Field label="End Date" required>
          <Input type="datetime-local" name="endDate" required />
        </Field>
        <Field label="Mode">
          <Select name="mode" defaultValue="Live Online">
            <option>Live Online</option>
            <option>Classroom</option>
            <option>Self-Paced</option>
          </Select>
        </Field>

        <div className="mb-4">
          <Checkbox 
            name="isGlobal" 
            label="All Countries (Global Schedule)" 
            checked={isGlobal}
            onChange={(e) => setIsGlobal(e.target.checked)}
          />
        </div>

        {!isGlobal && (
          <div className="grid grid-cols-2 gap-2">
            <Field label="Country">
              <Select 
                name="countrySlug" 
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option value="">— Select Country —</option>
                {COUNTRIES.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="City">
              <Select 
                name="citySlug" 
                disabled={!selectedCountry || availableCities.length === 0 || isLoadingCities}
                defaultValue=""
              >
                <option value="">{isLoadingCities ? "Loading cities..." : "— Select City —"}</option>
                {availableCities.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </Select>
            </Field>
          </div>
        )}

        <Field label="Time Label">
          <Input name="timeLabel" placeholder="09:00 AM - 06:00 PM IST" />
        </Field>
        <Field label="Timezone">
          <Input name="timezone" placeholder="IST" />
        </Field>
        <div className="grid grid-cols-2 gap-2">
          <Field label="Price (INR)">
            <Input type="number" name="priceInr" />
          </Field>
          <Field label="Price (USD)">
            <Input type="number" name="priceUsd" />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Field label="Discount %">
            <Input type="number" name="discountPct" />
          </Field>
          <Field label="Seats Left">
            <Input type="number" name="seatsLeft" />
          </Field>
        </div>
        <Checkbox name="isFilling" label="Mark as Filling Fast" />
        <button type="submit" className="btn-primary w-full">
          Add Schedule
        </button>
      </Section>
    </form>
  );
}
