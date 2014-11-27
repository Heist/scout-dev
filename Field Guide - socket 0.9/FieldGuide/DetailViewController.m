//
//  MasterViewController.h
//  FieldGuide
//
//  Created by David Stubbs on 2014-10-22.
//  Copyright (c) 2014 DS. All rights reserved.
//	I love Jenny

#import "DetailViewController.h"

@interface DetailViewController ()

- (void)configureView;
@end

@implementation DetailViewController {
    
@private BOOL webViewLoaded;
@private BOOL isInvision;
    
}

#pragma mark - Managing the detail item

- (void)setDetailItem:(id)newDetailItem
{
    if (_detailItem != newDetailItem) {
        _detailItem = newDetailItem;
        
        // Update the view.
        [self configureView];
    }
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    
    [self configureView];
    
    _webView.delegate = self;
    
    [self.navigationController setNavigationBarHidden:YES animated:YES];
    
    _endCallButton.titleLabel.font = [UIFont fontWithName:@"FreightSansMedium" size:10.f];
    
}

- (void)configureView
{
    // Update the user interface for the detail item.
    
    if (self.detailItem) {
        
        NSString *detailWebURL = [_detailItem objectForKey:@"body"];
       
//        //Check if its an invsion link
//        if ([detailWebURL rangeOfString:@"invis"].location != NSNotFound){
//            isInvision = YES;
//            NSLog(@"Invision Link!!!", nil);
//            
//        }else{
//            isInvision = NO;
//        }
        
        NSURL *url = [NSURL URLWithString:detailWebURL];
        
        NSURLRequest *request = [NSURLRequest requestWithURL:url];
        
        [_webView loadRequest:request];
    }
}

- (void) endCall:(id)sender{
    
    [self.navigationController popViewControllerAnimated:YES];
    
}

-(BOOL)prefersStatusBarHidden{
    return YES;
}

- (void) viewWillDisappear:(BOOL)animated {
    
    [super viewWillDisappear:YES];
    
    //Try to release some memory
    [_webView removeFromSuperview];
    _webView.delegate = nil; _webView = nil;
    
    [self.navigationController setNavigationBarHidden:NO animated:YES];
    [[UIApplication sharedApplication] setStatusBarHidden:NO withAnimation:UIStatusBarAnimationSlide];
    
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
    [[NSURLCache sharedURLCache] removeAllCachedResponses];
}

# pragma mark - Webview Stuff


- (void)webViewDidStartLoad:(UIWebView *)webView {
    
    webViewLoaded = NO;
    
}
//
- (void)webViewDidFinishLoad:(UIWebView *)webView {
    
    webViewLoaded = YES;
}


- (UIImage*) imageFromWebview:(UIWebView*) webview{
    
    //store the original framesize to put it back after the snapshot
    CGRect originalFrame = webview.frame;
    
    //get the width and height of webpage using js (you might need to use another call, this doesn't work always)
    int webViewHeight = [[webview stringByEvaluatingJavaScriptFromString:@"document.body.scrollHeight;"] integerValue];
    int webViewWidth = [[webview stringByEvaluatingJavaScriptFromString:@"document.body.scrollWidth;"] integerValue];
    
    //set the webview's frames to match the size of the page
    [webview setFrame:CGRectMake(0, 0, webViewWidth, webViewHeight)];
    
    //make the snapshot
    UIGraphicsBeginImageContextWithOptions(webview.frame.size, false, 0.0);
    [webview.layer renderInContext:UIGraphicsGetCurrentContext()];
    UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    
    //set the webview's frame to the original size
    [webview setFrame:originalFrame];
    
    //and VOILA :)
    return image;
}

- (UIImage *)_captureImage
{
    
    // Screenshot the view.
    UIGraphicsBeginImageContext(self.view.bounds.size);
    [self.view.layer renderInContext:UIGraphicsGetCurrentContext()];
    
    UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    
    return image;
}
@end
