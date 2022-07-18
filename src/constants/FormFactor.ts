interface LighthouseConfigPreset {
  ci: {
    collect: {
      method: string
      headful: boolean
      additive: boolean
      url: string[]
      startServerCommand: string
      startServerReadyPattern: string
      isSinglePageApplication: boolean
      numberOfRuns: number
      psiStrategy: string
      settings: {
        preset: string
        chromeFlags: string
      }
    }
    upload: {
      target: string
      reportFilenamePattern: string
      outputDir: string
    }
    assert: {
      assertions: {
        [keyName: string]: string
      }
    }
  }
}

export type FormFactorName = 'desktop' | 'mobile'

const FormFactor: Record<FormFactorName, FormFactorName> = {
  desktop: 'desktop',
  mobile: 'mobile'
}

const COLLECT_OPTIONS = {
  method: 'node',
  headful: false,
  additive: false,
  url: [],
  startServerCommand: 'npm run start:dev',
  startServerReadyPattern: 'started server on',
  isSinglePageApplication: false,
  numberOfRuns: 1,
  settings: {
    preset: 'desktop',
    chromeFlags: '--disable-dev-shm-usage --no-sandbox'
  }
}

const UPLOAD_OPTIONS = {
  target: 'filesystem',
  reportFilenamePattern: '%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%'
}

const ASSERT_OPTIONS = {
  assertions: {
    'categories:performance': 'off',
    'categories:accessibility': 'off',
    'categories:best-practices': 'off',
    'categories:seo': 'off',
    'categories:pwa': 'off'
  }
}

export const FormFactorPreset = {
  [FormFactor.desktop]: {
    ci: {
      collect: {
        ...COLLECT_OPTIONS,
        psiStrategy: 'desktop',
        settings: {
          ...COLLECT_OPTIONS.settings,
          preset: 'desktop'
        }
      },
      upload: {
        ...UPLOAD_OPTIONS,
        outputDir: './.lighthouse-report/desktop'
      },
      assert: ASSERT_OPTIONS
    }
  },
  [FormFactor.mobile]: {
    ci: {
      collect: {
        ...COLLECT_OPTIONS,
        psiStrategy: 'mobile'
      },
      upload: {
        ...UPLOAD_OPTIONS,
        outputDir: './.lighthouse-report/mobile'
      },
      assert: ASSERT_OPTIONS
    }
  }
} as unknown as Record<FormFactorName, LighthouseConfigPreset>

export const FormFactorList: FormFactorName[] = ['mobile', 'desktop']

export default FormFactor
