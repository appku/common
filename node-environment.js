/**
 * This static class exposes the settings of the `NODE_ENV` environmental variable by
 * matching the value to the AppKu standardized environments: "development" (default),
 * "staging", "review" or production.
 */
class NodeEnvironment {
    
    /**
     * Returns the standardized environment name of the current process.
     * Can be "development", "staging", "review", or "production".
     * @type {String}
     */
    static get name() {
        if (/^stag|test/i.test(process.env.NODE_ENV)) {
            return 'staging';
        }
        if (/^rev|pre/i.test(process.env.NODE_ENV)) {
            return 'review';
        }
        if (/^prod|live/i.test(process.env.NODE_ENV)) {
            return 'production';
        }
        return 'development';
    }

    /**
     * Returns `true` if within a production environment, `false` if not.
     * @type {Boolean}
     */
    static get production() {
        return /^prod|live/i.test(process.env.NODE_ENV);
    }

    /**
     * Returns `true` if within a review environment, `false` if not.
     * @type {Boolean}
     */
    static get review() {
        return /^rev|pre/i.test(process.env.NODE_ENV);
    }

    /**
     * Returns `true` if within a staging environment, `false` if not.
     * @type {Boolean}
     */
    static get staging() {
        return /^stag|test/i.test(process.env.NODE_ENV);
    }

    /**
     * Returns `true` if within a development environment, `false` if not.
     * @type {Boolean}
     */
    static get development() {
        return !(NodeEnvironment.staging || NodeEnvironment.review || NodeEnvironment.production);
    }
}

export default NodeEnvironment;