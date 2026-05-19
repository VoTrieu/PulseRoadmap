import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { AppDropdown } from "../ui/AppDropdown";
import type {
  CustomerTier,
  FeedbackCreateInput,
  FeedbackSentiment,
  FeedbackUrgency,
} from "../../types/feedback";

type AddFeedbackDialogProps = {
  isSubmitting: boolean;
  onHide: () => void;
  onSubmit: (input: FeedbackCreateInput) => void;
  visible: boolean;
};

const productAreas = ["Admin", "Roadmap", "AI", "Analytics", "Releases"];
const sentiments: FeedbackSentiment[] = ["Positive", "Neutral", "Negative"];
const tiers: CustomerTier[] = ["Enterprise", "Growth", "Startup"];
const urgencies: FeedbackUrgency[] = ["High", "Medium", "Low"];
const sources = ["Customer call", "Portal", "Slack", "Email"];

const initialForm: FeedbackCreateInput = {
  customer: "",
  request: "",
  productArea: "Roadmap",
  sentiment: "Neutral",
  tier: "Growth",
  urgency: "Medium",
  source: "Portal",
  linkedFeature: "",
  receivedAt: "May 18",
};

function AddFeedbackDialog({ isSubmitting, onHide, onSubmit, visible }: AddFeedbackDialogProps) {
  const [form, setForm] = useState<FeedbackCreateInput>(initialForm);

  const isValid = Boolean(form.customer.trim() && form.request.trim() && form.linkedFeature.trim());

  useEffect(() => {
    if (!visible) {
      setForm(initialForm);
    }
  }, [visible]);

  function updateForm<Value extends FeedbackCreateInput[keyof FeedbackCreateInput]>(
    key: keyof FeedbackCreateInput,
    value: Value,
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function readFormValue(formData: FormData, key: keyof FeedbackCreateInput) {
    return String(formData.get(key) ?? "").trim();
  }

  function submitAction(formData: FormData) {
    const input: FeedbackCreateInput = {
      customer: readFormValue(formData, "customer"),
      request: readFormValue(formData, "request"),
      productArea: readFormValue(formData, "productArea"),
      sentiment: readFormValue(formData, "sentiment") as FeedbackSentiment,
      tier: readFormValue(formData, "tier") as CustomerTier,
      urgency: readFormValue(formData, "urgency") as FeedbackUrgency,
      source: readFormValue(formData, "source"),
      linkedFeature: readFormValue(formData, "linkedFeature"),
      receivedAt: readFormValue(formData, "receivedAt"),
    };

    if (!input.customer || !input.request || !input.linkedFeature) {
      return;
    }

    onSubmit(input);
  }

  function handleHide() {
    if (!isSubmitting) {
      onHide();
    }
  }

  return (
    <Dialog
      className="w-[min(42rem,calc(100vw-2rem))]"
      header="Add feedback"
      modal
      onHide={handleHide}
      visible={visible}
    >
      <form action={submitAction} className="grid gap-4">
        <label className="grid gap-2">
          <span className="text-sm font-semibold text-slate-700">Customer</span>
          <InputText
            name="customer"
            value={form.customer}
            onChange={(event) => updateForm("customer", event.target.value)}
            placeholder="Customer name"
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-slate-700">Request</span>
          <InputText
            name="request"
            value={form.request}
            onChange={(event) => updateForm("request", event.target.value)}
            placeholder="What did the customer ask for?"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">Product area</span>
            <AppDropdown
              options={productAreas}
              value={form.productArea}
              onChange={(event) => updateForm("productArea", event.value)}
            />
            <input name="productArea" type="hidden" value={form.productArea} />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">Customer tier</span>
            <AppDropdown
              options={tiers}
              value={form.tier}
              onChange={(event) => updateForm("tier", event.value)}
            />
            <input name="tier" type="hidden" value={form.tier} />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">Sentiment</span>
            <AppDropdown
              options={sentiments}
              value={form.sentiment}
              onChange={(event) => updateForm("sentiment", event.value)}
            />
            <input name="sentiment" type="hidden" value={form.sentiment} />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">Urgency</span>
            <AppDropdown
              options={urgencies}
              value={form.urgency}
              onChange={(event) => updateForm("urgency", event.value)}
            />
            <input name="urgency" type="hidden" value={form.urgency} />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">Source</span>
            <AppDropdown
              options={sources}
              value={form.source}
              onChange={(event) => updateForm("source", event.value)}
            />
            <input name="source" type="hidden" value={form.source} />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-slate-700">Received</span>
            <InputText
              name="receivedAt"
              value={form.receivedAt}
              onChange={(event) => updateForm("receivedAt", event.target.value)}
              placeholder="May 18"
            />
          </label>
        </div>

        <label className="grid gap-2">
          <span className="text-sm font-semibold text-slate-700">Linked feature</span>
          <InputText
            name="linkedFeature"
            value={form.linkedFeature}
            onChange={(event) => updateForm("linkedFeature", event.target.value)}
            placeholder="Roadmap item or feature idea"
          />
        </label>

        <div className="flex justify-end gap-2 pt-2">
          <Button label="Cancel" onClick={handleHide} outlined type="button" />
          <Button
            disabled={!isValid || isSubmitting}
            icon={isSubmitting ? "pi pi-spin pi-spinner" : "pi pi-plus"}
            label="Add feedback"
            type="submit"
          />
        </div>
      </form>
    </Dialog>
  );
}

export { AddFeedbackDialog };
