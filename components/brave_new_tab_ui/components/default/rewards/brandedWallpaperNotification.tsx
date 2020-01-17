/* This Source Code Form is subject to the terms of the Mozilla Public
* License, v. 2.0. If a copy of the MPL was not distributed with this file,
* You can obtain one at http://mozilla.org/MPL/2.0/. */

import * as React from 'react'

import {
  Title,
  SubTitle,
  SubTitleLink,
  CloseIcon,
  NotificationWrapper,
  OrphanedNotificationWrapper,
  NotificationAction,
  NotificationButton
} from './style'
import { CloseStrokeIcon } from 'brave-ui/components/icons'
import { getLocale, splitStringForTag } from '../../../../common/locale'

interface NotificationProps {
  onDismissNotification: (id: string) => void
  brandedWallpaperData?: NewTab.BrandedWallpaper
  isOrphan?: boolean
  onEnableAds?: () => void
  onHideSponsoredImages: () => void
  order: number
}

export default class BrandedWallpaperRewardsNotification extends React.PureComponent<NotificationProps, {}> {

  dismissNotification = () => {
    const notificationType = this.props.onEnableAds
      ? 'brandedWallpaperPreOptIn'
      : 'brandedWallpaper'
    this.props.onDismissNotification(notificationType)
  }

  renderPostAdsOptInContent () {
    const text = getLocale('rewardsWidgetBrandedNotificationDescription')
    const { beforeTag, duringTag, afterTag } = splitStringForTag(text, '$1', '$2')
    return (
      <>
        <Title>
          {getLocale('rewardsWidgetBrandedNotificationTitle')}
        </Title>
        <SubTitle>
          {beforeTag}
          <SubTitleLink href="https://brave.com/brave-rewards/">
            {duringTag}
          </SubTitleLink>
          {afterTag}
        </SubTitle>
        <NotificationAction onClick={this.props.onHideSponsoredImages}>
          {getLocale('rewardsWidgetBrandedNotificationHideAction')}
        </NotificationAction>
      </>
    )
  }

  renderPreAdsOptInContent () {
    const text = getLocale('rewardsWidgetEnableBrandedWallpaperSubTitle')
    const { beforeTag, duringTag, afterTag } = splitStringForTag(text, '$1', '$2')
    return (
      <>
        <Title>
          {getLocale('rewardsWidgetEnableBrandedWallpaperTitle')}
        </Title>
        <SubTitle>
          {beforeTag}
          <SubTitleLink onClick={this.props.onHideSponsoredImages}>
            {duringTag}
          </SubTitleLink>
          {afterTag}
        </SubTitle>
        <NotificationButton onClick={this.props.onEnableAds}>
          {getLocale('rewardsWidgetTurnOnAds')}
        </NotificationButton>
      </>
    )
  }

  render () {
    const { brandedWallpaperData, isOrphan } = this.props
    if (!brandedWallpaperData) {
      console.error('Asked to render a branded wallpaper but there was no data!')
      return null
    }
    const styleVars = { '--notification-counter': this.props.order } as React.CSSProperties
    const Wrapper = isOrphan ? OrphanedNotificationWrapper : NotificationWrapper
    return (
      <Wrapper
        style={styleVars}
      >
        <CloseIcon onClick={this.dismissNotification}>
          <CloseStrokeIcon />
        </CloseIcon>
          { this.props.onEnableAds
              ? this.renderPreAdsOptInContent()
              : this.renderPostAdsOptInContent()
          }
      </Wrapper>
    )
  }
}
