import { ensureDirSync } from "https://deno.land/std@0.66.0/fs/ensure_dir.ts";
import { copySync } from "https://deno.land/std@0.66.0/fs/copy.ts";

ensureDirSync(".git");
ensureDirSync(".git/hooks");
copySync("./scripts/pre-commit", ".git/hooks/pre-commit");

if (Deno.build.os !== "windows") {
  Deno.chmodSync(".git/scripts/pre-commit", 0o744);
}
