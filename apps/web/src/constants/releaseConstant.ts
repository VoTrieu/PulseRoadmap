import type { ButtonProps } from "primereact/button";
import type { TagProps } from "primereact/tag";
import type {
  ReleaseCreateInput,
  ReleaseStatus,
  ReleaseType,
} from "../types/release";

const RELEASE_STATUSES: ReleaseStatus[] = [
  "Planned",
  "QA",
  "Staged",
  "Shipped",
  "Canceled",
];

const RELEASE_TYPES: ReleaseType[] = ["Major", "Minor", "Patch", "Hotfix"];

const RELEASE_VISIBILITY_OPTIONS = [
  { label: "All visibility", value: "all" },
  { label: "Public", value: "public" },
  { label: "Internal", value: "internal" },
];

const RELEASE_STATUS_TAG_SEVERITY: Record<
  ReleaseStatus,
  TagProps["severity"]
> = {
  Planned: "info",
  QA: "warning",
  Staged: "warning",
  Shipped: "success",
  Canceled: "danger",
};

const RELEASE_TYPE_TAG_SEVERITY: Record<ReleaseType, TagProps["severity"]> = {
  Major: "danger",
  Minor: "info",
  Patch: "success",
  Hotfix: "warning",
};

const RELEASE_ACTION_SEVERITY = {
  edit: "success",
  delete: "danger",
} satisfies Record<string, ButtonProps["severity"]>;

const DEFAULT_RELEASE_FORM_VALUE: ReleaseCreateInput = {
  name: "",
  version: "",
  status: "Planned",
  releaseType: "Patch",
  owner: "",
  targetDate: "Jun 30",
  shippedAt: null,
  summary: "",
  internalNotes: "",
  publicNotes: "",
  includedFeatureIds: [],
  includedBugIds: [],
  isPublic: false,
};

export {
  DEFAULT_RELEASE_FORM_VALUE,
  RELEASE_ACTION_SEVERITY,
  RELEASE_STATUSES,
  RELEASE_STATUS_TAG_SEVERITY,
  RELEASE_TYPES,
  RELEASE_TYPE_TAG_SEVERITY,
  RELEASE_VISIBILITY_OPTIONS,
};