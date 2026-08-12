<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <link rel="preconnect" href="https://use.typekit.net">
    <link rel="preconnect" href="https://kit.fontawesome.com">
    <link rel="preconnect" href="https://region1.google-analytics.com">
    <link rel="preconnect" href="https://cdn.iubenda.com">

    <!-- #region google -->
    <script async src="https://www.googletagmanager.com/gtag/js?id={{ $data->config->gtag }}"></script>
    <script>
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', '{{ $data->config->gtag }}');
    </script>
    <!-- #endregion -->

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- #region seo stuff -->
    <title>{{ $data->config->title }} - {{ $data->config->role }}</title>
    <meta name="description" content="{{ $data->config->description }}" />
    <meta property="og:title" content="{{ $data->config->title }} - {{ $data->config->role }}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{{ request()->url() }}" />
    <meta property="og:image" name="image" content="" />
    <meta name="Copyright" content="© {{ $data->config->site_url }} {{ \Carbon\Carbon::now()->year }}" />
    <meta name="author" content="{{ $data->config->nick }} - {{ $data->config->personal_email }}" />
    <link rel="canonical" href="{{ request()->url() }}">
    <!-- #endregion -->

    <!-- #region favicon -->
    <link rel="icon" href="{{ asset('favicon/' . $assets . '/favicon.ico') }}">
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('favicon/' . $assets . '/apple-touch-icon.png') }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('favicon/' . $assets . '/favicon-32x32.png') }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('favicon/' . $assets . '/favicon-16x16.png') }}">
    <link rel="manifest" href="{{ asset('favicon/' . $assets . '/site.webmanifest') }}">
    <!-- #endregion -->

    <!-- #region prevent no-js -->
    <script>
        document.documentElement.className = "js";
    </script>
    <!-- #endregion -->

    <link rel="stylesheet" href="https://use.typekit.net/lby4anc.css">
    <script src="https://kit.fontawesome.com/d4363451a9.js" crossorigin="anonymous"></script>

    @vite(['resources/css/' . $assets . '.css', 'resources/js/' . $assets . '.js'])

    <!-- #region iubenda -->
    <script type="text/javascript">
        var _iub = _iub || [];
        _iub.csConfiguration = {
            "siteId": {{ $data->config->iubenda_site_id }},
            "cookiePolicyId": {{ $data->config->iubenda_cookie_policy_id }},
            "lang": "en",
            "storage": {
                "useSiteId": true
            }
        };
    </script>
    <script type="text/javascript" src="https://cs.iubenda.com/autoblocking/3941325.js"></script>
    <script type="text/javascript" src="//cdn.iubenda.com/cs/iubenda_cs.js" charset="UTF-8" async></script>
    <!-- #endregion -->
</head>

<body class="loading">
    <div class="wrapper">
        <!-- #region sidebar -->
        <div class="sidebar">
            <div class="photo">
                <div class="photo__wrapper">
                    <img src="{{ asset('images/photos_' . $assets . '.webp') }}" alt="{{ $data->config->title }}">
                </div>
            </div>
            <div class="socials socials--left">
                <a class="social" title="LinkedIn" href="{{ $data->config->linkedin }}" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands fa-linkedin"></i>
                </a>
                <a class="social" title="GitHub" href="{{ $data->config->github }}" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands fa-github"></i>
                </a>
            </div>
            <div class="socials socials--right">
                <a class="social" title="Whatsapp" href="{{ $data->config->whatsapp }}" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands fa-whatsapp"></i>
                </a>
                <a class="social" title="Telegram" href="{{ $data->config->telegram }}" target="_blank" rel="noopener noreferrer">
                    <i class="fa-brands fa-telegram"></i>
                </a>
            </div>
            <div class="contacts">
                <a href="mailto:{{ $data->config->email }}" class="contact contact--link">
                    <span class="contact__icon">
                        <i class="fa-solid fa-paper-plane"></i>
                    </span>
                    <span class="contact__text">{{ $data->config->email }}</span>
                </a>
                <a href="{{ $data->config->github }}" target="_blank" class="contact contact--link">
                    <span class="contact__icon">
                        <i class="fa-brands fa-github"></i>
                    </span>
                    <span class="contact__text">{{ $data->config->githubRepo }}</span>
                </a>
                <a href="tel:{{ $data->config->phone2 }}" class="contact contact--link">
                    <span class="contact__icon">
                        <i class="fa-solid fa-phone"></i>
                    </span>
                    <span class="contact__text">[{{ $data->config->country2 }}] {{ $data->config->phone2 }}</span>
                </a>
                <a href="tel:{{ $data->config->phone }}" class="contact contact--link">
                    <span class="contact__icon">
                        <i class="fa-solid fa-phone"></i>
                    </span>
                    <span class="contact__text">[{{ $data->config->country }}] {{ $data->config->phone }}</span>
                </a>
                @if (!empty($data->config->location))
                    <div class="contact">
                        <span class="contact__icon">
                            <i class="fa-solid fa-house"></i>
                        </span>
                        <span class="contact__text">{{ $data->config->location }}</span>
                    </div>
                @endif
                <div class="contact">
                    <span class="contact__icon {{ $data->config->location ? 'contact__icon--alt' : '' }}">
                        <i class="fa-solid fa-house-heart"></i>
                    </span>
                    <span class="contact__text">{{ $data->config->love }}</span>
                </div>
            </div>
            <div class="segment">
                <div class="segment__wrapper">
                    <h2 class="segment__title">
                        <span class="segment__label segment__label--current" data-index="0">About</span>
                        <span class="segment__label" data-index="1">Skills</span>
                        <span class="segment__label" data-index="2">Experience</span>
                        <span class="segment__label" data-index="3">Showcase</span>
                        <span class="segment__label" data-index="4">Education</span>
                        <span class="segment__label" data-index="5">Passions</span>
                        <span class="segment__label" data-index="6">Tidbits</span>
                    </h2>
                    <span class="segment__line"></span>
                    <div class="segment__socials">
                        <div>
                            <a class="social" title="LinkedIn" href="{{ $data->config->linkedin }}" target="_blank" rel="noopener noreferrer">
                                <i class="fa-brands fa-linkedin"></i>
                            </a>
                            <a class="social" title="GitHub" href="{{ $data->config->github }}" target="_blank" rel="noopener noreferrer">
                                <i class="fa-brands fa-github"></i>
                            </a>
                        </div>
                        <div>
                            <a class="social" title="Whatsapp" href="{{ $data->config->whatsapp }}" target="_blank" rel="noopener noreferrer">
                                <i class="fa-brands fa-whatsapp"></i>
                            </a>
                            <a class="social" title="Telegram" href="{{ $data->config->telegram }}" target="_blank" rel="noopener noreferrer">
                                <i class="fa-brands fa-telegram"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- #endregion -->
        <!-- #region content -->
        <main class="content">
            <header class="header">
                <div class="header__name">
                    <h3>{{ $data->config->title }}</h3>
                </div>
                <div class="header__role">
                    <h1>{{ $data->config->role }}</h1>
                    <a href="{{ asset('cv/' . $data->config->cv) }}" target="_blank" class="header__button header__button--desktop">
                        <span><i class="fa-solid fa-download"></i></span>
                        <span>Download Curriculum Vitae</span>
                    </a>
                </div>
                <a href="{{ asset('cv/' . $data->config->cv) }}" target="_blank" class="header__button header__button--mobile">
                    <span><i class="fa-solid fa-download"></i></span>
                    <span>Download Curriculum Vitae</span>
                </a>
            </header>
            <div class="content__wrapper">
                <!-- #region introduction -->
                <section class="section introduction" data-view="0">
                    <div class="contacts">
                        <a href="mailto:{{ $data->config->email }}" class="contact contact--link">
                            <span class="contact__icon">
                                <i class="fa-solid fa-paper-plane"></i>
                            </span>
                            <span class="contact__text">{{ $data->config->email }}</span>
                        </a>
                        <a href="tel:{{ $data->config->phone2 }}" class="contact contact--link">
                            <span class="contact__icon">
                                <i class="fa-solid fa-phone"></i>
                            </span>
                            <span class="contact__text">[{{ $data->config->country2 }}] {{ $data->config->phone2 }}</span>
                        </a>
                        <a href="tel:{{ $data->config->phone }}" class="contact contact--link">
                            <span class="contact__icon">
                                <i class="fa-solid fa-phone"></i>
                            </span>
                            <span class="contact__text">[{{ $data->config->country }}] {{ $data->config->phone }}</span>
                        </a>
                        @if (!empty($data->config->location))
                            <div class="contact">
                                <span class="contact__icon">
                                    <i class="fa-solid fa-house"></i>
                                </span>
                                <span class="contact__text">{{ $data->config->location }}</span>
                            </div>
                        @endif
                        <div class="contact">
                            <span class="contact__icon contact__icon--alt">
                                <i class="fa-solid fa-house-heart"></i>
                            </span>
                            <span class="contact__text">{{ $data->config->love }}</span>
                        </div>
                    </div>
                    @foreach ($data->intro as $row)
                        {!! $row !!}
                    @endforeach
                </section>
                <!-- #endregion -->
                <!-- #region skills -->
                <section class="section skills" data-view="1">
                    <div class="header__name header__name--section">
                        <h3>Skills</h3>
                    </div>
                    @foreach ($data->skills as $skill)
                        <div class="skill">
                            <div class="skill__header">
                                <div class="skill__title">
                                    <h4>{{ $skill->title }}</h4>
                                </div>
                                <div class="skill__line">
                                    <span class="skill__line__base"></span>
                                    <span class="skill__line__dot" data-level="{{ $skill->level }}"></span>
                                </div>
                            </div>
                            <div class="skill__detail">
                                <div class="skill__chart">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" data-base-shape="{{ implode('|', array_map(fn($c) => implode(',', $c->point), $skill->chart)) }}" data-level-shape-perc="{{ implode(',', array_map(fn($c) => $c->percentage, $skill->chart)) }}"></svg>
                                    @foreach ($skill->chart as $chart)
                                        <span style="left:{{ $chart->label->position[0] }}%;top:{{ $chart->label->position[1] }}%;">{{ $chart->label->title }}</span>
                                    @endforeach
                                </div>
                                <div class="skill__description">
                                    <div>
                                        {!! $skill->description !!}
                                    </div>
                                    <div class="skill__grid">
                                        @foreach ($skill->grid as $s)
                                            <div class="skill__grid__item">
                                                <div class="skill__grid__item__title">
                                                    @if ($s->icon->code != '')
                                                        <span class="skill__grid__item__icon">
                                                            @if ($s->icon->fa)
                                                                <i class="{{ $s->icon->code }}"></i>
                                                            @else
                                                                <img src="{{ asset('images/skills/' . $s->icon->code) }}" alt="">
                                                            @endif
                                                        </span>
                                                    @endif
                                                    <span class="skill__grid__item__text">
                                                        {{ $s->text }}
                                                    </span>
                                                </div>
                                                <div class="skill__grid__item__stars">
                                                    @for ($i = 1; $i <= 5; $i++)
                                                        <div class="skill__grid__item__star" {{ $i <= $s->stars ? 'data-color' : '' }}></div>
                                                    @endfor
                                                </div>
                                            </div>
                                        @endforeach
                                    </div>
                                </div>

                            </div>
                        </div>
                    @endforeach

                    <div class="languages">
                        @foreach ($data->languages as $language)
                            <div class="language">
                                <div class="language__circle">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" data-percentage="{{ $language->percentage }}">
                                        <circle cx="50" cy="50" r="50"></circle>
                                    </svg>
                                    <img src="{{ asset('images/languages/' . $language->icon) }}" alt="">
                                    @if ($language->level)
                                        <span>{{ $language->level }}</span>
                                    @endif
                                </div>
                                <div class="language__label">{{ $language->label }}</div>
                                <div class="language__detail">
                                    {!! $language->detail !!}
                                </div>
                            </div>
                        @endforeach
                    </div>
                </section>
                <!-- #endregion -->
                <!-- #region experiences -->
                <section class="section experiences" data-view="2">
                    <div class="header__name header__name--section">
                        <h3>Experience</h3>
                    </div>
                    @foreach ($data->experiences as $experience)
                        <div class="experience">
                            <span class="experience__dot"></span>
                            <div class="experience__detail">
                                <div class="experience__title">
                                    <p>{{ $experience->title[0] }}</p>
                                    <p>{{ $experience->title[1] }}</p>
                                </div>
                                <div class="experience__role">
                                    <p>{{ $experience->role[0] }}</p>
                                    <span>|</span>
                                    <p>{{ $experience->role[1] }}</p>
                                </div>
                                <div class="experience__description">
                                    {!! $experience->description !!}
                                </div>
                            </div>
                        </div>
                    @endforeach
                    <span class="experiences__line"></span>
                </section>
                <!-- #endregion -->
                <!-- #region showcase -->
                <section class="section showcase" data-view="3">
                    <div class="header__name header__name--section">
                        <h3>Showcase</h3>
                    </div>
                    <div class="showcase__introduction">
                        {!! $data->showcase->introduction !!}
                    </div>
                    <div class="works">
                        @foreach ($data->showcase->works as $work)
                            <div class="work">
                                <div class="work__preview">
                                    <div class="work__preview__tilt">
                                        <img src="{{ asset('images/showcase/' . $work->images[0]) }}" class="work__preview__image work__preview__image--back" alt="">
                                        <img src="{{ asset('images/showcase/' . $work->images[1]) }}" class="work__preview__image work__preview__image--front" alt="">
                                    </div>
                                </div>
                                <div class="work__detail">
                                    <p class="work__type">
                                        {{ $work->type }}
                                    </p>
                                    <div class="work__line">
                                        <p class="work__label">
                                            Project
                                        </p>
                                        <a class="work__link" href="{{ $work->url }}" target="_blank" rel="noopener noreferrer">
                                            {{ $work->link }}
                                            <span><i class="fa-solid fa-external-link"></i></span>
                                        </a>
                                        <p class="work__text">
                                            {!! $work->text !!}
                                        </p>
                                    </div>
                                    <div class="work__line">
                                        <p class="work__label">
                                            My role
                                        </p>
                                        <p class="work__text">
                                            {{ $work->role }}
                                        </p>
                                    </div>
                                    <div class="work__line">
                                        <p class="work__label">
                                            Behind the scene
                                        </p>
                                        <p class="work__text">
                                            {{ $work->behind }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </section>
                <!-- #endregion -->
                <!-- #region education -->
                <section class="section education" data-view="4">
                    <div class="header__name header__name--section">
                        <h3>Education</h3>
                    </div>
                    @foreach ($data->education->items as $item)
                        <div class="education__item">
                            <div class="education__title">
                                <p>{{ $item->title[0] }}</p>
                                <p>{{ $item->title[1] }}</p>
                            </div>
                            <div class="education__role">
                                <p>{{ $item->role[0] }}</p>
                                <span>|</span>
                                <p>{{ $item->role[1] }}</p>
                            </div>
                            <div class="education__description">
                                {!! $item->description !!}
                            </div>
                            <ul class="tasks">
                                @foreach ($item->tasks as $task)
                                    <li><span class="tasks__dot"></span><span>{!! $task !!}</span></li>
                                @endforeach
                            </ul>
                        </div>
                    @endforeach
                    <div class="education__annotation">
                        {!! $data->education->annotation !!}
                    </div>
                </section>
                <!-- #endregion -->
                <!-- #region passions -->
                <section class="section passions" data-view="5">
                    <div class="header__name header__name--section">
                        <h3>Passions</h3>
                    </div>
                    @foreach ($data->passions as $passion)
                        <div class="passion">
                            <div class="passion__icon"><i class="fa-solid fa-{{ $passion->icon }}"></i></div>
                            <div class="passion__text">
                                {!! $passion->text !!}
                            </div>
                        </div>
                    @endforeach
                </section>
                <!-- #endregion -->
                <!-- #region elses -->
                <section class="section elses" data-view="6">
                    <div class="header__name header__name--section">
                        <h3>Tidbits</h3>
                    </div>
                    <div class="elses__text">
                        {!! $data->footer[0] !!}
                        <br><br>
                        {!! $data->footer[1] !!}
                    </div>
                    <div class="elses__footer">
                        <a href="mailto:{{ $data->config->email }}" class="contact contact--link">
                            <span class="contact__icon">
                                <i class="fa-solid fa-paper-plane"></i>
                            </span>
                            <span class="contact__text">{{ $data->config->email }}</span>
                        </a>
                        <a href="tel:{{ $data->config->phone }}" class="contact contact--link">
                            <span class="contact__icon">
                                <i class="fa-solid fa-phone"></i>
                            </span>
                            <span class="contact__text">[{{ $data->config->country }}] {{ $data->config->phone }}</span>
                        </a>
                        <a href="tel:{{ $data->config->phone2 }}" class="contact contact--link">
                            <span class="contact__icon">
                                <i class="fa-solid fa-phone"></i>
                            </span>
                            <span class="contact__text">[{{ $data->config->country2 }}] {{ $data->config->phone2 }}</span>
                        </a>
                    </div>
                </section>
                <!-- #endregion -->
            </div>
        </main>
        <!-- #endregion -->
    </div>
</body>

</html>
