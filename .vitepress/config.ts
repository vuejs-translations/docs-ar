import fs from 'fs'
import path from 'path'
import { defineConfigWithTheme } from 'vitepress'
import type { Config as ThemeConfig } from '@vue/theme'
import baseConfig from '@vue/theme/config'
import { headerPlugin } from './headerMdPlugin'
// import { textAdPlugin } from './textAdMdPlugin'

const nav: ThemeConfig['nav'] = [
  {
    text: 'التوثيقات',
    activeMatch: `^/(guide|style-guide|cookbook|examples)/`,
    items: [
      { text: 'الدليل', link: '/guide/introduction' },
      { text: 'الدليل التطبيقي', link: '/tutorial/' },
      { text: 'الأمثلة', link: '/examples/' },
      { text: 'انطلاقة سريعة', link: '/guide/quick-start' },
      // { text: 'دليل الأسلوب', link: '/style-guide/' },
      { text: 'فهرس', link: '/glossary/' },
      {
        text: 'Vue 2 توثيقات ',
        link: 'https://v2.vuejs.org'
      },
      {
        text: 'Vue 2 الترقية من',
        link: 'https://v3-migration.vuejs.org/'
      }
    ]
  },
  {
    text: '(API) مراجع الواجهة البرمجية',
    activeMatch: `^/api/`,
    link: '/api/'
  },
  {
    text: 'حقل التجارب',
    link: 'https://play.vuejs.org'
  },
  {
    text: 'بيئة العمل',
    activeMatch: `^/ecosystem/`,
    items: [
      {
        text: 'Resources',
        items: [
          { text: 'الشركاء', link: '/partners/' },
          { text: '(Themes) قوالب', link: '/ecosystem/themes' },
          {
            text: 'الشهادة',
            link: 'https://certification.vuejs.org/?ref=vuejs-nav'
          },
          { text: 'الوظائف', link: 'https://vuejobs.com/?ref=vuejs' },
          { text: 'شراء قمصان', link: 'https://vue.threadless.com/' }
        ]
      },
      {
        text: 'المكتبات الرسمية',
        items: [
          { text: 'Vue Router', link: 'https://router.vuejs.org/' },
          { text: 'Pinia', link: 'https://pinia.vuejs.org/' },
          { text: 'دليل الأدوات', link: '/guide/scaling-up/tooling.html' }
        ]
      },
      {
        text: 'دروس عبر الفيديو',
        items: [
          {
            text: 'Vue Mastery منصة',
            link: 'https://www.vuemastery.com/courses/'
          },
          {
            text: 'Vue Schoolمنصة ',
            link: 'https://vueschool.io/?friend=vuejs&utm_source=Vuejs.org&utm_medium=Link&utm_content=Navbar%20Dropdown'
          }
        ]
      },
      {
        text: 'مساعدة',
        items: [
          {
            text: 'دردشة عبر منصة ديسكورد',
            link: 'https://discord.com/invite/HBherRA'
          },
          {
            text: 'GitHub نقاشات',
            link: 'https://github.com/vuejs/core/discussions'
          },
          {
            text: 'DEV Community على منصة vue وسم ',
            link: 'https://dev.to/t/vue'
          }
        ]
      },
      {
        text: 'المستجدات',
        items: [
          { text: 'المدونة', link: 'https://blog.vuejs.org/' },
          { text: 'تويتر', link: 'https://twitter.com/vuejs' },
          { text: 'الفعاليات', link: 'https://events.vuejs.org/' },
          { text: 'النشرة البريدية', link: 'https://news.vuejs.org' }
        ]
      }
    ]
  },
  {
    text: 'حولنا',
    activeMatch: `^/about/`,
    items: [
      { text: 'الأسئلة الشائعة', link: '/about/faq' },
      { text: 'الفريق', link: '/about/team' },
      { text: 'الإصدارات', link: '/about/releases' },
      {
        text: 'دليل المجتمع',
        link: '/about/community-guide'
      },
      { text: 'مدونة قواعد السلوك', link: '/about/coc' },
      {
        text: 'الوثائقي',
        link: 'https://www.youtube.com/watch?v=OrxmtDw4pVI'
      }
    ]
  },
  {
    text: 'كن راعياً',
    link: '/sponsor/'
  },
  {
    text: 'الشركاء',
    link: '/partners/',
    activeMatch: `^/partners/`
  }
]

export const sidebar: ThemeConfig['sidebar'] = {
  '/guide/': [
    {
      text: 'ابدأ',
      items: [
        { text: 'المقدمة', link: '/guide/introduction' },
        {
          text: 'انطلاقة سريعة',
          link: '/guide/quick-start'
        }
      ]
    },
    {
      text: 'أساسيات',
      items: [
        {
          text: 'إنشاء تطبيق',

          link: '/guide/essentials/application'
        },
        {
          text: ' صيغة القالب ',
          link: '/guide/essentials/template-syntax'
        },
        {
          text: 'أساسيات التفاعل',
          link: '/guide/essentials/reactivity-fundamentals'
        },
        {
          text: 'الخاصيات المحسوبة',
          link: '/guide/essentials/computed'
        },
        {
          text: 'ربط التنسيقات و الأصناف',
          link: '/guide/essentials/class-and-style'
        },
        {
          text: 'التصيير الشرطي',
          link: '/guide/essentials/conditional'
        },
        { text: 'تصيير القوائم', link: '/guide/essentials/list' },
        {
          text: 'معالجة الأحداث',
          link: '/guide/essentials/event-handling'
        },
        { text: 'ربط إدخالات النموذج', link: '/guide/essentials/forms' },
        {
          text: 'خطافات دورة الحياة',
          link: '/guide/essentials/lifecycle'
        },
        { text: 'الخاصيات المراقبة', link: '/guide/essentials/watchers' },
        {
          text: 'Refs مراجع القالب',
          link: '/guide/essentials/template-refs'
        },
        {
          text: 'أساسيات المكونات',
          link: '/guide/essentials/component-basics'
        }
      ]
    },
    {
      text: 'المكونات بالتفصيل',
      items: [
        {
          text: 'التسجيل',
          link: '/guide/components/registration'
        },
        { text: 'الخاصيات', link: '/guide/components/props' },
        { text: 'الأحداث', link: '/guide/components/events' },
        { text: 'المُوجِّهة v-model', link: '/guide/components/v-model' },
        {
          text: 'السمات المستترة',
          link: '/guide/components/attrs'
        },
        { text: 'المنافذ', link: '/guide/components/slots' },
        {
          text: 'تزويد/حقن',
          link: '/guide/components/provide-inject'
        },
        {
          text: 'المكونات اللاتزامنية',
          link: '/guide/components/async'
        }
      ]
    },
    {
      text: 'إعادة الإستخدام',
      items: [
        {
          text: 'الدوال التركيبية',
          link: '/guide/reusability/composables'
        },
        {
          text: 'سمات مُوجهة مخصصة',
          link: '/guide/reusability/custom-directives'
        },
        { text: 'الملحقات', link: '/guide/reusability/plugins' }
      ]
    },
    {
      text: 'مكونات مدمجة',
      items: [
        { text: 'Transition', link: '/guide/built-ins/transition' },
        {
          text: 'TransitionGroup',
          link: '/guide/built-ins/transition-group'
        },
        { text: 'KeepAlive', link: '/guide/built-ins/keep-alive' },
        { text: 'Teleport', link: '/guide/built-ins/teleport' },
        { text: 'Suspense', link: '/guide/built-ins/suspense' }
      ]
    },
    {
      text: 'الإرتقاء و التدرج',
      items: [
        {
          text: '(SFC) المكونات أحادية الملف',
          link: '/guide/scaling-up/sfc'
        },
        { text: 'الأدوات', link: '/guide/scaling-up/tooling' },
        { text: 'التوجيه', link: '/guide/scaling-up/routing' },
        {
          text: 'إدارة الحالة',
          link: '/guide/scaling-up/state-management'
        },
        { text: 'الإختبار', link: '/guide/scaling-up/testing' },
        {
          text: '(SSR) التصيير من الخادم',
          link: '/guide/scaling-up/ssr'
        }
      ]
    },
    {
      text: 'أحسن الممارسات',
      items: [
        {
          text: 'النشر الإنتاجي',
          link: '/guide/best-practices/production-deployment'
        },
        {
          text: 'الكفاءة',
          link: '/guide/best-practices/performance'
        },
        {
          text: 'شمولية الوصول',
          link: '/guide/best-practices/accessibility'
        },
        {
          text: 'الأمن',
          link: '/guide/best-practices/security'
        }
      ]
    },
    {
      text: 'التايبسكريبت',
      items: [
        { text: 'نظرة شاملة', link: '/guide/typescript/overview' },
        {
          text: 'TS و الواجهة التركيبية',
          link: '/guide/typescript/composition-api'
        },
        {
          text: ' TS و واجهة الخيارات ',
          link: '/guide/typescript/options-api'
        }
      ]
    },
    {
      text: 'مواضيع اضافية',
      items: [
        {
          text: 'Vue طرق استخدام',
          link: '/guide/extras/ways-of-using-vue'
        },
        {
          text: 'الأسئلة الشائعة عن الواجهة التركيبية ',
          link: '/guide/extras/composition-api-faq'
        },
        {
          text: 'التفاعلية بالتفصيل',
          link: '/guide/extras/reactivity-in-depth'
        },
        {
          text: 'آلية التصيير',
          link: '/guide/extras/rendering-mechanism'
        },
        {
          text: 'JSXدوال التصيير و ال',
          link: '/guide/extras/render-function'
        },
        {
          text: 'و مكونات الويب Vue',
          link: '/guide/extras/web-components'
        },
        {
          text: 'تقنيات التحريك',
          link: '/guide/extras/animation'
        }
        // {
        //   text: 'Building a Library for Vue',
        //   link: '/guide/extras/building-a-library'
        // },
        // {
        //   text: 'Vue for React Devs',
        //   link: '/guide/extras/vue-for-react-devs'
        // }
      ]
    }
  ],
  '/api/': [
    {
      text: 'الواجهة البرمجية العامة',
      items: [
        { text: 'التطبيق', link: '/api/application' },
        {
          text: 'عام',
          link: '/api/general'
        }
      ]
    },
    {
      text: 'الواجهة التركيبية ',
      items: [
        { text: 'الدالة ()setup', link: '/api/composition-api-setup' },
        {
          text: 'التفاعلية: الأساسيات',
          link: '/api/reactivity-core'
        },
        {
          text: 'التفاعلية : الأدوات',
          link: '/api/reactivity-utilities'
        },
        {
          text: 'التفاعلية: الدليل المتقدم',
          link: '/api/reactivity-advanced'
        },
        {
          text: 'خطافات دورة الحياة',
          link: '/api/composition-api-lifecycle'
        },
        {
          text: 'حقن الإعتمادية',
          link: '/api/composition-api-dependency-injection'
        }
      ]
    },
    {
      text: 'واجهة الخيارات ',
      items: [
        { text: 'الخيارات : الحالة', link: '/api/options-state' },
        { text: 'الخيارات : التصيير', link: '/api/options-rendering' },
        {
          text: 'الخيارات : دورة الحياة',
          link: '/api/options-lifecycle'
        },
        {
          text: 'الخيارات : التركيب',
          link: '/api/options-composition'
        },
        { text: 'الخيارات : متفرقة', link: '/api/options-misc' },
        {
          text: 'نسخة مكون',
          link: '/api/component-instance'
        }
      ]
    },
    {
      text: 'عناصر مدمجة',
      items: [
        { text: 'السمات الموجهة', link: '/api/built-in-directives' },
        { text: 'المكونات', link: '/api/built-in-components' },
        {
          text: 'عناصر خاصة',
          link: '/api/built-in-special-elements'
        },
        {
          text: 'سمات خاصة',
          link: '/api/built-in-special-attributes'
        }
      ]
    },
    {
      text: 'المكونات أحادية الملف',
      items: [
        { text: 'مواصفات الصيغة', link: '/api/sfc-spec' },
        { text: '<script setup>', link: '/api/sfc-script-setup' },
        { text: 'CSSميزات ال', link: '/api/sfc-css-features' }
      ]
    },
    {
      text: 'الواجهة البرمجية المتقدمة',
      items: [
        { text: 'دالة التصيير', link: '/api/render-function' },
        { text: 'التصيير من الخادم', link: '/api/ssr' },
        { text: 'TypeScriptأدوات النوع ل', link: '/api/utility-types' },
        { text: 'مصير مخصص', link: '/api/custom-renderer' }
      ]
    }
  ],
  '/examples/': [
    {
      text: 'أمثلة قاعدية ',
      items: [
        {
          text: 'مرحبا',
          link: '/examples/#hello-world'
        },
        {
          text: 'معالجة إدخالات المستخدم',
          link: '/examples/#handling-input'
        },
        {
          text: 'ربط السمات',
          link: '/examples/#attribute-bindings'
        },
        {
          text: 'الشروط و الحلقات',
          link: '/examples/#conditionals-and-loops'
        },
        {
          text: 'ربط النماذج',
          link: '/examples/#form-bindings'
        },
        {
          text: 'مكون بسيط',
          link: '/examples/#simple-component'
        }
      ]
    },
    {
      text: 'أمثلة تطبيقية',
      items: [
        {
          text: 'Markdown محرر',
          link: '/examples/#markdown'
        },
        {
          text: 'بحث عن بيانات',
          link: '/examples/#fetching-data'
        },
        {
          text: 'جدول مع خاصية الترتيب و البحث',
          link: '/examples/#grid'
        },
        {
          text: 'واجهة عرض شجرية',
          link: '/examples/#tree'
        },
        {
          text: 'SVG مخطط',
          link: '/examples/#svg'
        },
        {
          text: '  نافذة منبثقة مع خاصية الإنتقال',
          link: '/examples/#modal'
        },
        {
          text: 'قائمة مع خاصية الإنتقال',
          link: '/examples/#list-transition'
        },
        {
          text: 'MVCقائمة مهام بال',
          link: '/examples/#todomvc'
        }
      ]
    },
    {
      // https://eugenkiss.github.io/7guis/
      text: '7 GUIs واجهات مستخدم رسومية  ',
      items: [
        {
          text: 'عداد',
          link: '/examples/#counter'
        },
        {
          text: 'محول درجة الحرارة',
          link: '/examples/#temperature-converter'
        },
        {
          text: 'حجز رحلات طيران',
          link: '/examples/#flight-booker'
        },
        {
          text: 'مؤقت',
          link: '/examples/#timer'
        },
        {
          text: 'CRUD',
          link: '/examples/#crud'
        },
        {
          text: 'راسم دائرة',
          link: '/examples/#circle-drawer'
        },
        {
          text: 'خلايا',
          link: '/examples/#cells'
        }
      ]
    }
  ],
  '/style-guide/': [
    {
      text: 'دليل الأسلوب',
      items: [
        {
          text: 'نظرة شاملة',
          link: '/style-guide/'
        },
        {
          text: 'أ - قواعد أساسية',
          link: '/style-guide/rules-essential'
        },
        {
          text: 'ب - مقترح بقوة',
          link: '/style-guide/rules-strongly-recommended'
        },
        {
          text: 'ج - مقترح',
          link: '/style-guide/rules-recommended'
        },
        {
          text: 'د - استخدام بحذر',
          link: '/style-guide/rules-use-with-caution'
        }
      ]
    }
  ]
}

// Placeholder of the i18n config for @vuejs-translations.
// const i18n: ThemeConfig['i18n'] = {
// }

export default defineConfigWithTheme<ThemeConfig>({
  extends: baseConfig,

  lang: 'ar',
  dir:'rtl',
  title: 'Vue.js إطار',
  description: ' الإطار التقدمي للـJavascript  -Vue.js',
  srcDir: 'src',
  srcExclude: ['tutorial/**/description.md'],

  head: [
    ['meta', { name: 'theme-color', content: '#3c8772' }],
    ['meta', { name: 'twitter:site', content: '@vuejs' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    [
      'meta',
      {
        name: 'twitter:image',
        content: 'https://vuejs.org/images/logo.png'
      }
    ],
    [
      'link',
      {
        rel: 'preconnect',
        href: 'https://sponsors.vuejs.org'
      }
    ],
    [
      'script',
      {},
      fs.readFileSync(
        path.resolve(__dirname, './inlined-scripts/restorePreference.js'),
        'utf-8'
      )
    ],
    [
      'script',
      {
        src: 'https://cdn.usefathom.com/script.js',
        'data-site': 'XNOLWPLB',
        'data-spa': 'auto',
        defer: ''
      }
    ],
    [
      'script',
      {
        src: 'https://vueschool.io/banner.js?affiliate=vuejs&type=top',
        async: 'true'
      }
    ]
  ],

  themeConfig: {
    nav,
    sidebar,
    // Placeholder of the i18n config for @vuejs-translations.
    // i18n,

    localeLinks: [
      {
        link: 'https://vuejs.org',
        text: 'الإصدار الإنجليزي',
        repo: 'https://github.com/vuejs/docs'
      },
      {
        link: 'https://cn.vuejs.org',
        text: '简体中文',
        repo: 'https://github.com/vuejs-translations/docs-zh-cn'
      },
      {
        link: 'https://ja.vuejs.org',
        text: '日本語',
        repo: 'https://github.com/vuejs-translations/docs-ja'
      },
      {
        link: 'https://ua.vuejs.org',
        text: 'Українська',
        repo: 'https://github.com/vuejs-translations/docs-uk'
      },
      {
        link: 'https://fr.vuejs.org',
        text: 'Français',
        repo: 'https://github.com/vuejs-translations/docs-fr'
      },
      {
        link: 'https://ko.vuejs.org',
        text: '한국어',
        repo: 'https://github.com/vuejs-translations/docs-ko'
      },
      {
        link: 'https://pt.vuejs.org',
        text: 'Português',
        repo: 'https://github.com/vuejs-translations/docs-pt'
      },
      {
        link: 'https://bn.vuejs.org',
        text: 'বাংলা',
        repo: 'https://github.com/vuejs-translations/docs-bn'
      },
      {
        link: 'https://it.vuejs.org',
        text: 'Italiano',
        repo: 'https://github.com/vuejs-translations/docs-it'
      },
      {
        link: '/translations/',
        text: 'ساعدنا في الترجمة',
        isTranslationsDesc: true
      }
    ],

    algolia: {
      indexName: 'vuejs',
      appId: 'ML0LEBN7FQ',
      apiKey: 'f49cbd92a74532cc55cfbffa5e5a7d01',
      searchParameters: {
        facetFilters: ['version:v3']
      }
    },

    carbonAds: {
      code: 'CEBDT27Y',
      placement: 'vuejsorg'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/' },
      { icon: 'twitter', link: 'https://twitter.com/vuejs' },
      { icon: 'discord', link: 'https://discord.com/invite/HBherRA' }
    ],

    editLink: {
      repo: 'https://github.com/vuejs-translations/docs-ar',
      text: 'عدل هذه الصفحة على GitHub'
    },

    footer: {
      license: {
        text: ' MIT ترخيص معهد ماساتشوستس للتكنولوجيا',
        link: 'https://opensource.org/licenses/MIT'
      },
      copyright: `حقوق المؤلف © 2014-${new Date().getFullYear()} إيفان يو`
    }
  },

  markdown: {
    config(md) {
      md.use(headerPlugin)
        // .use(textAdPlugin)
    }
  },

  vite: {
    define: {
      __VUE_OPTIONS_API__: false
    },
    optimizeDeps: {
      include: ['gsap', 'dynamics.js'],
      exclude: ['@vue/repl']
    },
    // @ts-ignore
    ssr: {
      external: ['@vue/repl']
    },
    server: {
      host: true,
      fs: {
        // for when developing with locally linked theme
        allow: ['../..']
      }
    },
    build: {
      minify: 'terser',
      chunkSizeWarningLimit: Infinity
    },
    json: {
      stringify: true
    }
  }
})
