const parseBooleanEnv = (value?: string) => value?.toLowerCase() === "true";
const snowFallEnvValue = import.meta.env.PUBLIC_SNOW_FALL_ENABLED ?? "false";

export const SITE_CONFIG = {
  email: "hola-madrid101@pm.me",
  github: "https://github.com/r3nya/madrid101",
  bmc: "https://buymeacoffee.com/madrid101",
  enableSnowFall: parseBooleanEnv(snowFallEnvValue),
};
