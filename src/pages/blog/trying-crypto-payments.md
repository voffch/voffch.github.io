---
layout: ../../layouts/MarkdownPostLayout.astro
title: "My foray into crypto payments"
pubDate: 2024-11-01
description: "Outlining the experience of paying in ETH for an online service"
tags: ["money", "tech", "crypto"]
---

After a brief hiatus, I'm coming back to you with a cool story of how I used cryptocurrency to actually pay for something. But first,

> **Disclaimer**: this post is based on my personal experience and no part of it should be considered a financial advice. The actions described, including the use of cryptocurrencies, may be outlawed where you live. And I'm not a big expert, so some of my explanations may not be strictly correct. As always, do your own research before doing anything even remotely suspicious. Nobody paid me for this text though, so one thing you can be sure about is that there are no sponsored links here.

If you don't wanna read a lot of text, you can [jump straight to conclusions](#concluding-thoughts-as-a-faq).

## Why bother?

I've always been suspicious of all things crypto (crypto*currencies*, that is, not crypto*graphy*), but I've never paid too much attention to it. Like, if you aren't a gambling type of person, you're not expected to know technicalities about the inner working of casinos, and if you're not into scam industry, in general you're not supposed to know much about particular schemes. And those crypto-related news that one sees from time to time are centered on either "wow [such growth](https://www.theguardian.com/technology/2024/mar/05/bitcoin-cryptocurrency-new-record-value-explainer) very profitable" (see *casino*) or the guys like [this one](https://en.wikipedia.org/wiki/Sam_Bankman-Fried) or [that one](https://en.wikipedia.org/wiki/Do_Kwon) (see *not quite trustworthy financial institutions*). So I did my own research, namely, I googled something like "why crypto is a scam". If you know a little about search bubbles and confirmation biases, you see what I did there. *Voila!* dozens of articles reinforcing my previously held beliefs and prejudices. But oh, weren't they entertaining as well!

I don't know about you, but I just love reading about how something sucks. The tech companies produce crap (everyone does that from time to time)? Why don't we learn more about this? The economy is in ruins (no it isn't, it's only you who's insolvent)? Gimme! I suppose, this kind of thing makes one feel less inferior, like, see, it's not only I - thare are many things that suck! 

But seriously, go read or listen to that stuff - [lifeitself](https://web3.lifeitself.org), [Stephen Diehl](https://player.fm/series/tech-wont-save-us/web3-is-a-scam-not-a-revolution-w-stephen-diehl), [Cory Doctorow](https://pluralistic.net/2022/09/16/nondiscretionary-liabilities/#quatloos), etc. Their point of view is pretty convincing and, unlike cryptobros, they don't seem to tout *whatnot and thingie* they directly profit from.

By the way, that's how I discovered [Doctorow](https://craphound.com/), who's an antibullshit activist, a decent (published!) writer and is now one of my favorite bloggers, but that's another story.

Returning to the matter at hand, *my own research*, perhaps unsurprisingly, had only pumped my skepticism. But why did I need to even try cryptocurrency payments if I don't like their premises? The answer is simple: part interest in the shiny new things, part the fact that I'll need to renew my domain name next year anyway. Of all the payment methods that [Porkbun](https://porkbun.com), my marvellous, inexpensive and full of cool features registrar, has, I have access to two:

1. ask someone with a working credit card to pay for me (last time I used this method), and...
2. you guessed right, crypto!

Now me tell you how it was done.

## Choosing the coin

There are [literally thousands](https://en.wikipedia.org/wiki/List_of_cryptocurrencies) of different cryptocurrencies, but the vast majority of them are derived from just a few. And it's not as if they were, at some point in time, derived and are now on their own - they are still tied to their *mother currency* (I've just invented the term), or *network* (more on this later). At first, I thought that to simplify things I'd choose stablecoins, whose value is pegged to that of the USD. The domain name renewal, for which I pay, is denominated in USD in any case. However, turns out that there are several stablecoins tied to USD (<abbr title="USD Tether">USDT</abbr>, <abbr title="USD Coin">USDC</abbr>), and that some of them exist on different networks simultaneously. Hence, first, you choose a network, and then you choose a coin that exists on the network, or vice versa, but you can't have one without the other.

Mind that your choice of the coin also depends on whether you can acquire (buy) it or its network's native coin, and on whether it is accepted as a *medium of exchange*, i.e., whether you can actually buy anything with it. Fortunately, [Coinbase](https://coinbase.com), a company that processes transactions for Porkbun, accepts a lot of different currencies.

If we don't consider the smaller and younger fish, the network choice is basically between bitcoins (BTC) and ethereum (ETH). Both are questionable. Not belonging to the church of one or the other, I had the freedom to choose, though. BTC uses the proof-of-work technique for mining (minting) new shitcoins, and it is that notoriously environmentally unfriendly "*where did all the electricity go?*" mechanism. ETH since a few years back started to use the proof-of-stake mechanism (basically, *who has a lot of money, will have some more money*), so now it's supposed to be more *green*. Also, it sounds cool, and denotes something immaterial, such is the record in a global distributed ledger which you actually get when you buy it. **ETH** it would be then.

Such a rational-economic man I am. I think Adam Smith would've approved my ways of thinking.

## Choosing the wallet

When you buy a ~~coin~~database record, it goes into the database, but you should have means of manipulating it. Here comes a wallet, of which there are many kinds. Let's discard some outright. The first two from the list below are the so-called *cold wallets*, which is supposed to mean that they are very secure for the reason that you can't do anything with them unless you connect them to the network or to a hot wallet. The third is a hot wallet that doesn't belong to you.

- **paper wallet**: a passphrase written on a piece of physical paper.
- **hardware wallet**: an expensive gadget that isn't worth it for my purpose of a one-time 20$ payment.
- **custodial wallets**: *put the money in the bank, they become the bank's money* kind of wallet. Basically, it's a bank account denominated in crypto. The company that impersonates the bank is usually a crypto exchange (as in "stock exchange" but with crypto), and it has all the disadvantages and unlikely any advantages of a traditional bank. It collects your personal data as per its <abbr title="Know Your Client">KYC</abbr>/<abbr title="Anti Money Laundering">AML</abbr> policies and, to make your life more exciting, can block your account if it thinks it's suspicious (i.e., for an arbitrary reason). Meanwhile, such companies may not be regulated and controlled as strictly as a bank, so you may not have your government or a central bank to moderate your interaction with the company if something goes wrong. Besides, I can't even open an account with, e.g., Binance or Coinbase because my citizenship is financially invalid.

Which leaves us with a variety of **non-custodial hot wallets** that are apps or browser plugins. Here, I chose [MetaMask](https://metamask.io) - it's open-source (kinda, with its own strange license), fairly old, well-known and widely used, and its logo is a funny polygonal fox head. I installed it as an Android app.

## Buying the coin

To pay with crypto, one needs to buy crypto. Where I live the only way of exchanging fiat currency to crypto seems to be <abbr title="Peer to Peer">P2P</abbr> exchange. There are dozens of exchanges available, so to choose one with no prior knowledge you can use an exchange aggregator that tabulates the exchanges, their rates, accumulates reviews, etc. Here, [bestchange](https://www.bestchange.com) seems to be quite popular. In addition to the exchange rate, there are a few things to heed:

- every exchange sets its own minimal exchangeable amount of currency, which is usually at least 20-50 USD. If you don't want to see your whole salary in the cryptowallet, choose the sites that transact lower sums. They also tend to have somewhat worse exchange rates.
- the exchange may have its own KYC/AML procedures, which are not always apparent outright, so prepare to give away at least your name/surname/email address/credit card number (*without the date or CVC!*). For transferring smaller sums, though, it seems to be possible to find the exchange that wouldn't ask for more than that. Nobody wants to share their scanned passports with god knows whom.
- there are always risks, so don't transfer more money than you are comfortable with saying bye-bye to.
- last, but not least: if you are new to this and have zero crypto wallet balance, **buy only the native currency**. That is, if the chosen network is ethereum, buy yourself some ETH. You could always exchange it later if you feel inclined, with no additional P2P required. However, if you buy, say, USDT ERC20 tokens, which exist on ethereum network, you'll end up with USDT in your account but no means of spending them unless you have some ETH as well. More on this [below](#spending-the-coin).

After choosing an exchange service's website, the process itself is fairly simple. You fill the form on the website, complete with your wallet's address that you copy from your wallet app (looks like `0x49048044d57e1c92a77f79988d21fa8faf74e97e` - a 42-character hex number, think of it as of your bank account number). Then, you get the instructions on how to pay to the P2P recipient. After following the instructions, if everything goes smoothly, you get the above-zero balance on your ETH account. You can also check your address via the official [etherscan](https://etherscan.io/) blockchain explorer. Everybody can, because the blockchain and all the transactions are public by default. [Here](https://etherscan.io/address/0x49048044d57e1c92a77f79988d21fa8faf74e97e)'s an example of what it looks like. So, it is safe to share your address—nobody without your passphrase will be able to use the money in it—but *only if* you're comfortable with sharing your current balance and the whole transaction history.

## Spending the coin

To make the payment, I had to connect my wallet to the payment system from the shopping card checkout of my registrar. This is as if you're paying with a traditional bank's mobile app, when, to carry out the transaction, the website, with your permission, opens your bank app. Except this doesn't work for me in most cases with the bank, and didn't work in this case with the crypto wallet. The wallet app didn't want to open from either Firefox or Chrome no matter what.

Fortunately, in MetaMask there's a built-in web browser. It was there that I logged into my registrar's account, clicked checkout and, finally, was able to connect my wallet. So, now I just paid by transferring my ETH to the Coinbase's payment system, right? Wrong.

First, everything comes at a price. The price you have to pay for every transaction in ETH is called [gas fee](https://www.investopedia.com/terms/g/gas-ethereum.asp). The fee is denominated in gwei (1 gwei = 10<sup>-9</sup> ETH) and *is only payable in the network's native currency* - that's why I told you that with no ETH in your account no transaction would be possible. The wallet/payment system usually calculates the fees for you and gives you its estimate. The transaction fee can be, not quite straightforwardly, [calculated](https://ethereum.org/en/developers/docs/gas/#how-are-gas-fees-calculated) based on the type of transaction (simple transfer, coin swap, bridge, etc.) and, not quite predictably, on the current gas price. The gas price depends on the current network load - the more pending transactions, the greater the price. And the transactions are unequally geographically distributed: much more transactions are coming from the US than from, say, sub-Saharan Africa.

Get it? You'd better pay when most people on the other side of the world are fast asleep, unless you're comfortable with high commission fees. How high exactly you can check out [here](https://etherscan.io/gastracker). Typically, the gas fees on ethereum mainnet are large - from a few dollars to a few tens of dollars for a simple transaction, depending on the time of day and the day of the week.

Second, there are networks, and there are networks. After the P2P transaction, the ETH landed into the (wallet) address on what's called *Ethereum Mainnet*, which is, er, the main ethereum network. However, ~~to earn some money for themselves~~ for different reasons, incl. to avoid the ginormous transaction costs, people invented so-called [Layer 2](https://ethereum.org/en/developers/docs/scaling/#layer-2-scaling) networks that process their own transactions independently and then synchronize them with the mainnet. For us mortals, it means that

- to send the crypto to someone, you have to know both the address and the network;
- one cannot simply send the crypto to another network: you have to use 3rd-party bridges to do that;
- once you've bridged the crypto to the Layer 2 network, the subsequent transactions within that network are expected to be much, much cheaper (like, e.g., a few cents instead of a few dollars).

Well, Coinbase has its own network, Base, on which it processes the payments. So, in order to pay seamlessly and with a bit lower transaction fees, I bridged some ETH to Base using the MetaMask's built-in bridge service. There go my 2-3$ bridging gas fees. Perhaps, it would've been cheaper to use some 3rd-party service: last time I checked, [Uniswap](https://app.uniswap.org/)'s bridging rates were quite low. However, at this point I just wanted to be done with this payment, so meh.

And then I eventually paid 20$ in ETH, using Coinbase's Base network, and after additionally confirming the transaction on the registrar's website, my account with it got 20$ fatter.

## Concluding thoughts as a FAQ

### What are cryptocurrencies for?

Different people seem to use them for different things, including:

- investment, though crypto is a very volatile asset;
- savings, well, maybe it's possible in stablecoins if you believe in them;
- nefarious deeds (no comment on this);
- financial speculations (same);
- legit payments for goods and services.

Mind that this post discusses the latter use case only.

### Can you actually pay with ETH

If you can get it, if the other party accepts it, if you're prepared to spend some time to grasp a superficial understanding of how it all works, and if you're ready for the unpredictable time-dependent high transaction fees, then yes, you definitely can use ETH as surrogate money.

### Is it convenient?

Well, no, not exactly. With the bank transfer, you have to deal only with your bank's shitty app. With crypto, you'll probably have to use several services of various shittiness level. There's a number of third-party services one should rely on to acquire, transfer and spend crypto. It takes time and effort to choose the service and to understand what needs to be done through the optimistic techie talk bullshit surrounding these services while trying to guess whether you are being scammed right now. Ugh. I won't call it a smooth, flawless experience.

### What are the benefits?

For me, the one huge benefit of crypto payments is that it's an additional payment method. So, if the other means of paying are banned or inaccessible, cryptocurrency can jump to the rescue.

### What are the drawbacks and risks?

The main drawback of using crypto for payment is that transaction fees are volatile and probably fairly high. If the sum in question is small, they constitute a sizeable percentage of money spent: 2$ out of 20$ is 10% already, and, as far as the gas fees go on ethereum mainnet, it is fairly cheap.

The obvious risks are associated with acquiring crypto through P2P, which doesn't look safe at all. When you are using a crypto exchange service, you're transferring money to another third party - let's call it *that guy*. Who knows who *that guy* is? Maybe he's laundering money through crypto? Maybe he'll use your money in illicit financial schemes? If, say, FBI catches *that guy* and traces the money he received through the bank transfer to you, then you'll have to prove that you're not purposefully financing his scams. Mind that this concern is applicable not only to buying crypto, but to any P2P transactions, such as purchasing random "craft" stuff on social networks from people unknown.

But the following is specifically crypto-related. Since *that guy* can't create crypto from thin air, he transfers it to you from his own ETH (wallet) address. It's highly unlikely that you could check out *that guy*'s address in advance. The transaction gets recorded on the blockchain, where it is publically available. If you then decide to make a payment to someone big enough to worry about money laundering, he will check out your address, your transactions, and the addresses you dealt with. Now, if *that guy* did something bad and got caught, there's a chance that your ETH address will be labelled *dirty money* by association, and that your transaction will get blocked for the <abbr title="Anti Money Laundering">AML</abbr> reasons. In this case, it's likely that you'll end up with unspendable crypto.

And I can't imagine how exactly can you mitigate these risks if you don't personally know *that guy* you're commencing a P2P transaction with.

### Should I try it?

Decide for yourself. If nothing else works, why not? However, there may be safer and cheaper alternatives.

### Are cryptocurrencies ready to replace traditional finance?

In my opinion, this isn't happening any time soon.