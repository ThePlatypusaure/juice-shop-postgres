/*
 * Copyright (c) 2014-2025 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { AddressModelInit } from './address'
import { BasketModelInit } from './basket'
import { BasketItemModelInit } from './basketitem'
import { CaptchaModelInit } from './captcha'
import { CardModelInit } from './card'
import { ChallengeModelInit } from './challenge'
import { ComplaintModelInit } from './complaint'
import { DeliveryModelInit } from './delivery'
import { FeedbackModelInit } from './feedback'
import { ImageCaptchaModelInit } from './imageCaptcha'
import { MemoryModelInit } from './memory'
import { PrivacyRequestModelInit } from './privacyRequests'
import { ProductModelInit } from './product'
import { QuantityModelInit } from './quantity'
import { RecycleModelInit } from './recycle'
import { relationsInit } from './relations'
import { SecurityAnswerModelInit } from './securityAnswer'
import { SecurityQuestionModelInit } from './securityQuestion'
import { UserModelInit } from './user'
import { WalletModelInit } from './wallet'
import { Sequelize, Transaction } from 'sequelize'

/* jslint node: true */
const dbType = process.env.DB_TYPE || 'postgres';
const dbUser = process.env.DB_USER || 'postgres';
const dbPassword = process.env.DB_PASSWORD || 'asd123';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || '5432';
const dbName = process.env.DB_NAME || 'mydb';

const dbUrl = process.env.DATABASE_URL || `${dbType}://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;
const sequelize = new Sequelize(dbUrl, {
  dialect: 'postgres',
  quoteIdentifiers:  false,
  define: {
    freezeTableName: false
  },
  retry: {
    match: [/Deadlock/i],  // Postgres retry on deadlock
    name:  'query',
    max:   5
  },
  transactionType: Transaction.TYPES.IMMEDIATE,
  logging:         false
})
AddressModelInit(sequelize)
BasketModelInit(sequelize)
BasketItemModelInit(sequelize)
CaptchaModelInit(sequelize)
CardModelInit(sequelize)
ChallengeModelInit(sequelize)
ComplaintModelInit(sequelize)
DeliveryModelInit(sequelize)
FeedbackModelInit(sequelize)
ImageCaptchaModelInit(sequelize)
MemoryModelInit(sequelize)
PrivacyRequestModelInit(sequelize)
ProductModelInit(sequelize)
QuantityModelInit(sequelize)
RecycleModelInit(sequelize)
SecurityAnswerModelInit(sequelize)
SecurityQuestionModelInit(sequelize)
UserModelInit(sequelize)
WalletModelInit(sequelize)

relationsInit(sequelize)

export { sequelize }
