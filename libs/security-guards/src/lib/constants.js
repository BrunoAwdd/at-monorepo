"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleMerge = exports.TokenValidation = exports.PolicyEnforcementMode = exports.RoleMatch = exports.KEYCLOAK_COOKIE_DEFAULT = exports.KEYCLOAK_MULTITENANT_SERVICE = exports.KEYCLOAK_INSTANCE = exports.KEYCLOAK_CONNECT_OPTIONS = void 0;
/**
 * Used internally, provides keycloak options for the Nest guards.
 */
exports.KEYCLOAK_CONNECT_OPTIONS = 'KEYCLOAK_CONNECT_OPTIONS';
/**
 * Key for injecting a keycloak instance.
 */
exports.KEYCLOAK_INSTANCE = 'KEYCLOAK_INSTANCE';
/**
 * Key for injecting a keycloak multi tenant service.
 */
exports.KEYCLOAK_MULTITENANT_SERVICE = 'KEYCLOAK_MULTITENANT_SERVICE';
/**
 * Default cookie key.
 */
exports.KEYCLOAK_COOKIE_DEFAULT = 'KEYCLOAK_JWT';
/**
 * Role matching mode.
 */
var RoleMatch;
(function (RoleMatch) {
    /**
     * Match all roles
     */
    RoleMatch["ALL"] = "all";
    /**
     * Match any roles
     */
    RoleMatch["ANY"] = "any";
})(RoleMatch || (exports.RoleMatch = RoleMatch = {}));
/**
 * Policy enforcement mode.
 */
var PolicyEnforcementMode;
(function (PolicyEnforcementMode) {
    /**
     * Deny all request when there is no matching resource.
     */
    PolicyEnforcementMode["ENFORCING"] = "enforcing";
    /**
     * Allow all request even when there's no matching resource.
     */
    PolicyEnforcementMode["PERMISSIVE"] = "permissive";
})(PolicyEnforcementMode || (exports.PolicyEnforcementMode = PolicyEnforcementMode = {}));
/**
 * Token validation methods.
 */
var TokenValidation;
(function (TokenValidation) {
    /**
     * The default validation method, performs live validation via Keycloak servers.
     */
    TokenValidation["ONLINE"] = "online";
    /**
     * Validate offline against the configured keycloak options.
     */
    TokenValidation["OFFLINE"] = "offline";
    /**
     * Does not check for any validation. Should only be used for special cases (i.e development, internal networks)
     */
    TokenValidation["NONE"] = "none";
})(TokenValidation || (exports.TokenValidation = TokenValidation = {}));
var RoleMerge;
(function (RoleMerge) {
    /**
     * Overrides roles if defined both controller and handlers, with controller taking over.
     */
    RoleMerge[RoleMerge["OVERRIDE"] = 0] = "OVERRIDE";
    /**
     * Merges all roles from both controller and handlers.
     */
    RoleMerge[RoleMerge["ALL"] = 1] = "ALL";
})(RoleMerge || (exports.RoleMerge = RoleMerge = {}));
