/** Fired by the catalog's "Ask about this" buttons; the lead form listens and preselects the product. */
export const EQUIPMENT_EVENT = "lead:equipment"

export function requestEquipment(name: string) {
  window.dispatchEvent(new CustomEvent<string>(EQUIPMENT_EVENT, { detail: name }))
}
