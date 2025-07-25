// TinyMCE Editor Configuration
export const TINYMCE_API_KEY = 'cwmzs5f0ycudmcszi72om2gut8mmuswtkvhs0g0dial1qi49'; // Your TinyMCE API key from tiny.cloud

// Default editor configurations
export const DEFAULT_EDITOR_CONFIG = {
  height: 500,
  menubar: true,
  plugins: [
    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount',
    'save', 'template', 'pagebreak', 'nonbreaking', 'emoticons', 'importcss'
    // 'paste' plugin removed
  ],
  toolbar: 'undo redo | blocks | ' +
    'bold italic forecolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'link image media table | pagebreak nonbreaking | ' +
    'removeformat | help',
  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
  skin: 'oxide-dark',
  content_css: 'dark',
  branding: false,
  promotion: false,
  // Enable autosave for version history support
  autosave_ask_before_unload: true,
  autosave_interval: '30s',
  autosave_prefix: 'tinymce-autosave-{path}{query}-{id}-',
  autosave_restore_when_empty: true,
  // Image upload handling
  images_upload_url: '/api/media/upload',
  automatic_uploads: true,
  // SEO features
  setup: function(editor) {
    editor.on('change', function() {
      // Trigger word count and SEO analysis
      editor.execCommand('mceWordCount');
    });
  }
};

// Configuration for SEO-focused editor
export const SEO_EDITOR_CONFIG = {
  ...DEFAULT_EDITOR_CONFIG,
  plugins: [
    ...DEFAULT_EDITOR_CONFIG.plugins,
    'seo' // Requires additional plugin installation
    // 'paste' plugin removed
  ],
  toolbar: DEFAULT_EDITOR_CONFIG.toolbar + ' | seo',
  seo_content_analyze_delay: 500
};

// Configuration for minimal editor (for comments, etc.)
export const MINIMAL_EDITOR_CONFIG = {
  height: 200,
  menubar: false,
  plugins: [
    'autolink', 'lists', 'link', 'emoticons', 'help'
    // 'paste' plugin removed
  ],
  toolbar: 'undo redo | bold italic | bullist numlist | link emoticons',
  skin: 'oxide-dark',
  content_css: 'dark',
  branding: false,
  promotion: false
};

// Editor language options for multilingual support
export const EDITOR_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ar', name: 'Arabic' },
  { code: 'ru', name: 'Russian' }
];
