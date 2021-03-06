/* Copyright (c) 2019 The Brave Authors. All rights reserved.
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. */

#include "brave/browser/browser_context_keyed_service_factories.h"

#include "brave/browser/brave_shields/ad_block_pref_service_factory.h"
#include "brave/browser/brave_shields/cookie_pref_service_factory.h"
#include "brave/browser/search_engines/search_engine_provider_service_factory.h"
#include "brave/browser/tor/tor_profile_service_factory.h"
#include "brave/components/brave_ads/browser/ads_service_factory.h"
#include "brave/components/brave_rewards/browser/rewards_service_factory.h"
#include "brave/components/greaselion/browser/buildflags/buildflags.h"

#if BUILDFLAG(ENABLE_GREASELION)
#include "brave/browser/greaselion/greaselion_service_factory.h"
#endif

#if !defined(OS_ANDROID)
#include "brave/browser/ui/bookmark/bookmark_prefs_service_factory.h"
#endif

namespace brave {

void EnsureBrowserContextKeyedServiceFactoriesBuilt() {
  brave_ads::AdsServiceFactory::GetInstance();
  brave_rewards::RewardsServiceFactory::GetInstance();
  brave_shields::AdBlockPrefServiceFactory::GetInstance();
  brave_shields::CookiePrefServiceFactory::GetInstance();
#if BUILDFLAG(ENABLE_GREASELION)
  greaselion::GreaselionServiceFactory::GetInstance();
#endif
  TorProfileServiceFactory::GetInstance();
  SearchEngineProviderServiceFactory::GetInstance();

#if !defined(OS_ANDROID)
  BookmarkPrefsServiceFactory::GetInstance();
#endif
}

}  // namespace brave
