page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

activate :i18n, langs: [:it, :en]
activate :directory_indexes

activate :autoprefixer do |config|
  config.browsers = ['last 2 versions', 'Explorer >= 8']
  config.cascade = false
  config.inline = true
end

activate :dato,
  domain: 'admin.inimasnaredrums.com',
  token: "e0af3f9526250992cb21cd45c0b1e95b",
  base_url: 'http://www.inimasnaredrums.com'

configure :development do
  activate :livereload
end

configure :build do
end

