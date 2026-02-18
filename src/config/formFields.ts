export type FieldType = 'text' | 'email' | 'tel' | 'date' | 'textarea' | 'select';

export interface FieldOption {
  label: string;
  value: string;
}

export interface FormFieldConfig {
  name:        string;        // Must match Zod schema key
  label:       string;        // Display label
  type:        FieldType;     // HTML input type
  placeholder: string;
  required:    boolean;
  options?:    FieldOption[]; // For 'select' type
  colSpan?:    1 | 2;        // Grid column span (1 = half, 2 = full)
}

// ─────────────────────────────────────────────────────────────
// ⭐ ADD NEW FIELDS HERE — this is the ONLY place you need to edit
// ─────────────────────────────────────────────────────────────
export const FORM_FIELDS: FormFieldConfig[] = [
  {
    name:        'firstName',
    label:       'First Name',
    type:        'text',
    placeholder: 'e.g. Alice',
    required:    true,
    colSpan:     1,
  },
  {
    name:        'lastName',
    label:       'Last Name',
    type:        'text',
    placeholder: 'e.g. Johnson',
    required:    true,
    colSpan:     1,
  },
  {
    name:        'phone',
    label:       'Phone Number',
    type:        'tel',
    placeholder: 'e.g. 555-123-4567',
    required:    true,
    colSpan:     1,
  },
  {
    name:        'email',
    label:       'Email Address',
    type:        'email',
    placeholder: 'e.g. alice@example.com',
    required:    true,
    colSpan:     1,
  },

  // ─── EXAMPLE: Uncomment below to add new fields ───────────────
  // {
  //   name:        'dateOfBirth',
  //   label:       'Date of Birth',
  //   type:        'date',
  //   placeholder: '',
  //   required:    false,
  //   colSpan:     1,
  // },
  // {
  //   name:        'address',
  //   label:       'Address',
  //   type:        'textarea',
  //   placeholder: 'Enter full address',
  //   required:    false,
  //   colSpan:     2,
  // },
];